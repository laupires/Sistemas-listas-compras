# CSI606-2026-01 - Remoto - Trabalho Final - Resultados

## Discente: Laura Andrade Pires

### Resumo

O trabalho desenvolvido foi um **Sistema de Lista de Compras**, pensado para ajudar na organização das compras de casa. A ideia é permitir que o usuário cadastre os produtos que precisa comprar, informe a quantidade, escolha uma categoria e acompanhe quais itens já foram comprados.

O sistema possui uma tela de login e, após o acesso, o usuário consegue visualizar a lista de compras e realizar as principais ações: cadastrar, listar, editar, excluir e marcar produtos como comprados. O projeto foi dividido em frontend e backend, utilizando uma API simples para manipular os dados e um arquivo JSON para armazenar os itens cadastrados.

### 1. Tecnologias utilizadas - Backend e Frontend

### Frontend

- **HTML:** usado para montar a estrutura das páginas, como a tela de login, o formulário de cadastro e a área de listagem dos itens.
- **CSS:** usado para estilizar a aplicação, organizando cores, botões, cards, espaçamentos e deixando a interface mais agradável.
- **JavaScript:** usado para controlar as ações da tela, como login, cadastro, edição, exclusão, marcação de item como comprado e comunicação com o backend.

### Backend

- **Node.js:** usado para executar o servidor da aplicação.
- **Express:** usado para criar as rotas da API.
- **CORS:** usado para permitir a comunicação entre o frontend e o backend.
- **JSON:** usado para armazenar os dados dos itens cadastrados, por meio do arquivo `itens.json`.

### 2. Funcionalidades implementadas

- **Login:** tela inicial onde o usuário informa e-mail e senha para acessar o sistema.
- **Logout:** botão para sair do sistema e retornar para a tela de login.
- **Cadastro de usuário:** permite que o usuário crie uma conta informando nome, e-mail e senha.
- **Identificação do usuário logado:** exibe na tela principal o nome e o e-mail do usuário que está utilizando o sistema.
- **Cadastro de itens:** permite adicionar produtos à lista de compras.
- **Listagem de itens:** exibe os produtos cadastrados com nome, quantidade e categoria.
- **Edição de itens:** permite alterar as informações de um produto já cadastrado.
- **Exclusão de itens:** permite remover produtos da lista, com confirmação antes da exclusão.
- **Marcação como comprado:** permite marcar ou desmarcar um item como comprado.
- **Contador de itens:** mostra a quantidade total de produtos cadastrados.
- **Persistência dos dados:** os itens são salvos no arquivo `itens.json`.
- **CRUD de itens:** foram implementadas as operações de criar, listar, atualizar e excluir produtos, usando as rotas `GET`, `POST`, `PUT` e `DELETE`.

### 3. Funcionalidades previstas e não implementadas

- **Autenticação:** não foi implementada validação real de senha nem criptografia.
- **Recuperação de senha:** a opção “Esqueci minha senha” apenas exibe uma mensagem informativa.
- **Banco de dados:** nesta versão, os dados são armazenados em arquivo JSON, e não em um banco como MySQL ou PostgreSQL.

### 4. Outras funcionalidades implementadas

- mensagem quando não há itens cadastrados;
- confirmação antes de excluir um item.
- usuário cria uma conta informando nome, e-mail e senha.

### 5. Principais desafios e dificuldades

As principais dificuldades foram separar o projeto em frontend e backend e fazer a comunicação entre eles.

Também foi necessário controlar a exibição das telas, para que a lista de compras aparecesse somente depois do login.

### 6. Instruções para instalação e execução

1. Certifique-se de ter o Node.js instalado em sua máquina.
2. Baixe ou clone o repositório do  projeto e abra a pasta no Visual Studio Code.
3. Acesse a pasta do backend pelo terminal : `cd backend`
4. Instale as dependências do projeto: `npm install`
5. Execute o servidor: `node server.js`
6. O terminal deverá exibir a mensagem: `Servidor rodando em http://localhost:3000`
7. Com o backend rodando, abra o arquivo `index.html` localizado na pasta `frontend`, preferencialmente usando a extensão Live Server.
8. Na tela de login, informe e-mail e senha para acessar o sistema.
9. Após o login, será possível cadastrar, listar, editar, excluir e marcar itens como comprados.

**Observação:** o backend precisa permanecer em execução enquanto o sistema estiver sendo utilizado.

### 7. Referências

Foram utilizados os materiais da disciplina de Sistemas Web I e documentações de apoio das tecnologias utilizadas no projeto, como HTML, CSS, JavaScript, Node.js e Express.
