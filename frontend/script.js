const loginPage = document.getElementById("loginPage");
const appPage = document.getElementById("appPage");
const loginForm = document.getElementById("loginForm");
const btnSair = document.getElementById("btnSair");
const esqueciSenha = document.getElementById("esqueciSenha");

const formItem = document.getElementById("formItem");
const produtoInput = document.getElementById("produto");
const quantidadeInput = document.getElementById("quantidade");
const categoriaInput = document.getElementById("categoria");
const itemIdInput = document.getElementById("itemId");
const listaCompras = document.getElementById("listaCompras");
const btnSalvar = document.getElementById("btnSalvar");
const totalItens = document.getElementById("totalItens");

const API_URL = "http://localhost:3000";

let itens = [];

function verificarLogin() {
  const usuarioLogado = localStorage.getItem("usuarioLogado");

  if (usuarioLogado) {
    loginPage.classList.add("escondido");
    appPage.classList.remove("escondido");
    carregarItens();
  } else {
    loginPage.classList.remove("escondido");
    appPage.classList.add("escondido");
  }
}

loginForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  const resposta = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, senha }),
  });

  if (resposta.ok) {
    const dados = await resposta.json();

    localStorage.setItem("usuarioLogado", dados.usuario);
    verificarLogin();
  } else {
    alert("Erro ao realizar login.");
  }
});

btnSair.addEventListener("click", function () {
  localStorage.removeItem("usuarioLogado");
  verificarLogin();
});

esqueciSenha.addEventListener("click", function (event) {
  event.preventDefault();
  alert("Funcionalidade de recuperação de senha ainda não implementada.");
});

async function carregarItens() {
  const resposta = await fetch(`${API_URL}/itens`);
  itens = await resposta.json();
  renderizarLista();
}

function limparFormulario() {
  produtoInput.value = "";
  quantidadeInput.value = "";
  categoriaInput.value = "";
  itemIdInput.value = "";
  btnSalvar.textContent = "Adicionar item";
}

function atualizarTotal() {
  const total = itens.length;

  if (total === 1) {
    totalItens.textContent = "1 item";
  } else {
    totalItens.textContent = `${total} itens`;
  }
}

function renderizarLista() {
  listaCompras.innerHTML = "";

  atualizarTotal();

  if (itens.length === 0) {
    listaCompras.innerHTML = `
      <p class="mensagem-vazia">
        Nenhum item cadastrado ainda.
      </p>
    `;
    return;
  }

  itens.forEach((item) => {
    const li = document.createElement("li");
    li.className = item.comprado ? "item comprado" : "item";

    li.innerHTML = `
      <div class="item-info">
        <div class="nome-produto">${item.produto}</div>
        <div class="detalhes">Quantidade: ${item.quantidade}</div>
        <span class="categoria">${item.categoria}</span>
      </div>

      <div class="acoes">
        <button class="btn-comprado" onclick="marcarComoComprado(${item.id})">
          ${item.comprado ? "Desmarcar" : "Comprado"}
        </button>

        <button class="btn-editar" onclick="editarItem(${item.id})">
          Editar
        </button>

        <button class="btn-excluir" onclick="excluirItem(${item.id})">
          Excluir
        </button>
      </div>
    `;

    listaCompras.appendChild(li);
  });
}

formItem.addEventListener("submit", async function (event) {
  event.preventDefault();

  const produto = produtoInput.value.trim();
  const quantidade = quantidadeInput.value;
  const categoria = categoriaInput.value;
  const itemId = itemIdInput.value;

  if (itemId) {
    const itemAtual = itens.find((item) => item.id == itemId);

    await fetch(`${API_URL}/itens/${itemId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        produto,
        quantidade,
        categoria,
        comprado: itemAtual.comprado,
      }),
    });
  } else {
    await fetch(`${API_URL}/itens`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        produto,
        quantidade,
        categoria,
      }),
    });
  }

  limparFormulario();
  carregarItens();
});

async function marcarComoComprado(id) {
  const item = itens.find((item) => item.id === id);

  await fetch(`${API_URL}/itens/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      produto: item.produto,
      quantidade: item.quantidade,
      categoria: item.categoria,
      comprado: !item.comprado,
    }),
  });

  carregarItens();
}

function editarItem(id) {
  const item = itens.find((item) => item.id === id);

  produtoInput.value = item.produto;
  quantidadeInput.value = item.quantidade;
  categoriaInput.value = item.categoria;
  itemIdInput.value = item.id;

  btnSalvar.textContent = "Salvar alteração";
}

async function excluirItem(id) {
  const confirmar = confirm("Deseja excluir este item?");

  if (confirmar) {
    await fetch(`${API_URL}/itens/${id}`, {
      method: "DELETE",
    });

    carregarItens();
  }
}

verificarLogin();
