const loginPage = document.getElementById("loginPage");
const cadastroPage = document.getElementById("cadastroPage");
const appPage = document.getElementById("appPage");

const loginForm = document.getElementById("loginForm");
const cadastroForm = document.getElementById("cadastroForm");

const btnSair = document.getElementById("btnSair");
const esqueciSenha = document.getElementById("esqueciSenha");
const abrirCadastro = document.getElementById("abrirCadastro");
const voltarLogin = document.getElementById("voltarLogin");
const usuarioLogadoInfo = document.getElementById("usuarioLogadoInfo");

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

function mostrarLogin() {
  loginPage.classList.remove("escondido");
  cadastroPage.classList.add("escondido");
  appPage.classList.add("escondido");
}

function mostrarCadastro() {
  loginPage.classList.add("escondido");
  cadastroPage.classList.remove("escondido");
  appPage.classList.add("escondido");
}

function mostrarApp() {
  loginPage.classList.add("escondido");
  cadastroPage.classList.add("escondido");
  appPage.classList.remove("escondido");
}

function verificarLogin() {
  const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

  if (usuarioLogado) {
    mostrarApp();
    usuarioLogadoInfo.textContent = `Usuário: ${usuarioLogado.nome} (${usuarioLogado.email})`;
    carregarItens();
  } else {
    mostrarLogin();
  }
}

abrirCadastro.addEventListener("click", function (event) {
  event.preventDefault();
  mostrarCadastro();
});

voltarLogin.addEventListener("click", function (event) {
  event.preventDefault();
  mostrarLogin();
});

cadastroForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  const nome = document.getElementById("nomeCadastro").value.trim();
  const email = document.getElementById("emailCadastro").value.trim();
  const senha = document.getElementById("senhaCadastro").value;

  const resposta = await fetch(`${API_URL}/cadastro`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ nome, email, senha }),
  });

  const dados = await resposta.json();

  if (resposta.ok) {
    alert("Cadastro realizado com sucesso!");
    cadastroForm.reset();
    mostrarLogin();
  } else {
    alert(dados.mensagem);
  }
});

loginForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value;

  const resposta = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, senha }),
  });

  const dados = await resposta.json();

  if (resposta.ok) {
    localStorage.setItem("usuarioLogado", JSON.stringify(dados.usuario));
    verificarLogin();
  } else {
    alert(dados.mensagem);
  }
});

btnSair.addEventListener("click", function () {
  localStorage.removeItem("usuarioLogado");
  usuarioLogadoInfo.textContent = "";
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
  const confirmar = confirm("Deseja realmente excluir este item?");

  if (confirmar) {
    await fetch(`${API_URL}/itens/${id}`, {
      method: "DELETE",
    });

    carregarItens();
  }
}

verificarLogin();
