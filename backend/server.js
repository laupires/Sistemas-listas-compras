const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const arquivoItens = "itens.json";
const arquivoUsuarios = "usuarios.json";

function lerArquivo(caminho) {
  if (!fs.existsSync(caminho)) {
    fs.writeFileSync(caminho, "[]");
  }

  const dados = fs.readFileSync(caminho);
  return JSON.parse(dados);
}

function salvarArquivo(caminho, dados) {
  fs.writeFileSync(caminho, JSON.stringify(dados, null, 2));
}

app.post("/cadastro", (req, res) => {
  const usuarios = lerArquivo(arquivoUsuarios);
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ mensagem: "Preencha todos os campos." });
  }

  const usuarioExistente = usuarios.find((usuario) => usuario.email === email);

  if (usuarioExistente) {
    return res.status(400).json({ mensagem: "E-mail já cadastrado." });
  }

  const novoUsuario = {
    id: Date.now(),
    nome,
    email,
    senha,
  };

  usuarios.push(novoUsuario);
  salvarArquivo(arquivoUsuarios, usuarios);

  res.status(201).json({ mensagem: "Usuário cadastrado com sucesso!" });
});

app.post("/login", (req, res) => {
  const usuarios = lerArquivo(arquivoUsuarios);
  const { email, senha } = req.body;

  const usuario = usuarios.find(
    (usuario) => usuario.email === email && usuario.senha === senha,
  );

  if (!usuario) {
    return res.status(401).json({ mensagem: "E-mail ou senha inválidos." });
  }

  res.json({
    mensagem: "Login realizado com sucesso!",
    usuario: {
      nome: usuario.nome,
      email: usuario.email,
    },
  });
});

app.put("/usuarios/:email", (req, res) => {
  const usuarios = lerArquivo(arquivoUsuarios);
  const emailAtual = req.params.email;
  const { nome, email, senha } = req.body;

  if (!nome || !email) {
    return res
      .status(400)
      .json({ mensagem: "Nome e e-mail são obrigatórios." });
  }

  const usuarioEncontrado = usuarios.find(
    (usuario) => usuario.email === emailAtual,
  );

  if (!usuarioEncontrado) {
    return res.status(404).json({ mensagem: "Usuário não encontrado." });
  }

  const usuarioExistente = usuarios.find(
    (usuario) => usuario.email === email && usuario.email !== emailAtual,
  );

  if (usuarioExistente) {
    return res
      .status(400)
      .json({ mensagem: "Este e-mail já está sendo usado." });
  }

  const usuariosAtualizados = usuarios.map((usuario) => {
    if (usuario.email === emailAtual) {
      return {
        ...usuario,
        nome,
        email,
        senha: senha ? senha : usuario.senha,
      };
    }

    return usuario;
  });

  salvarArquivo(arquivoUsuarios, usuariosAtualizados);

  res.json({
    mensagem: "Perfil atualizado com sucesso!",
    usuario: {
      nome,
      email,
    },
  });
});

app.delete("/usuarios/:email", (req, res) => {
  const usuarios = lerArquivo(arquivoUsuarios);
  const email = req.params.email;

  const usuariosFiltrados = usuarios.filter(
    (usuario) => usuario.email !== email,
  );

  salvarArquivo(arquivoUsuarios, usuariosFiltrados);

  res.json({ mensagem: "Conta excluída com sucesso!" });
});

app.get("/itens", (req, res) => {
  const itens = lerArquivo(arquivoItens);
  res.json(itens);
});

app.post("/itens", (req, res) => {
  const itens = lerArquivo(arquivoItens);

  const novoItem = {
    id: Date.now(),
    produto: req.body.produto,
    quantidade: req.body.quantidade,
    categoria: req.body.categoria,
    comprado: false,
  };

  itens.push(novoItem);
  salvarArquivo(arquivoItens, itens);

  res.status(201).json(novoItem);
});

app.put("/itens/:id", (req, res) => {
  const itens = lerArquivo(arquivoItens);
  const id = Number(req.params.id);

  const itensAtualizados = itens.map((item) => {
    if (item.id === id) {
      return {
        ...item,
        produto: req.body.produto,
        quantidade: req.body.quantidade,
        categoria: req.body.categoria,
        comprado: req.body.comprado,
      };
    }

    return item;
  });

  salvarArquivo(arquivoItens, itensAtualizados);
  res.json({ mensagem: "Item atualizado com sucesso!" });
});

app.delete("/itens/:id", (req, res) => {
  const itens = lerArquivo(arquivoItens);
  const id = Number(req.params.id);

  const itensFiltrados = itens.filter((item) => item.id !== id);

  salvarArquivo(arquivoItens, itensFiltrados);
  res.json({ mensagem: "Item excluído com sucesso!" });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
