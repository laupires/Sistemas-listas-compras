const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const arquivoItens = "itens.json";

function lerItens() {
  if (!fs.existsSync(arquivoItens)) {
    fs.writeFileSync(arquivoItens, "[]");
  }

  const dados = fs.readFileSync(arquivoItens);
  return JSON.parse(dados);
}

function salvarItens(itens) {
  fs.writeFileSync(arquivoItens, JSON.stringify(itens, null, 2));
}

app.get("/itens", (req, res) => {
  const itens = lerItens();
  res.json(itens);
});

app.post("/itens", (req, res) => {
  const itens = lerItens();

  const novoItem = {
    id: Date.now(),
    produto: req.body.produto,
    quantidade: req.body.quantidade,
    categoria: req.body.categoria,
    comprado: false,
  };

  itens.push(novoItem);
  salvarItens(itens);

  res.status(201).json(novoItem);
});

app.put("/itens/:id", (req, res) => {
  const itens = lerItens();
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

  salvarItens(itensAtualizados);
  res.json({ mensagem: "Item atualizado com sucesso!" });
});

app.delete("/itens/:id", (req, res) => {
  const itens = lerItens();
  const id = Number(req.params.id);

  const itensFiltrados = itens.filter((item) => item.id !== id);

  salvarItens(itensFiltrados);
  res.json({ mensagem: "Item excluído com sucesso!" });
});

app.post("/login", (req, res) => {
  const { email, senha } = req.body;

  if (email && senha) {
    res.json({
      mensagem: "Login realizado com sucesso!",
      usuario: email,
    });
  } else {
    res.status(400).json({
      mensagem: "E-mail e senha são obrigatórios.",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
