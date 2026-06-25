# Projeto SQLite com Node.js

Este é um projeto básico de introdução ao uso do banco de dados **SQLite** com **Node.js**. Ele demonstra de forma prática as operações fundamentais de banco de dados: criação do arquivo do banco, criação de tabelas, inserção de registros e execução de consultas (SELECT).

## 🚀 Pré-requisitos

Antes de começar, você precisará ter instalado em sua máquina:

- [Node.js](https://nodejs.org/)
- NPM (normalmente instalado junto com o Node.js)

## 📦 Instalação

1. Abra o terminal e navegue até a pasta do projeto:
   ```bash
   cd sqlite
   ```
2. Instale a dependência necessária (o módulo `sqlite3`):
   ```bash
   npm install sqlite3
   ```

## 📂 Estrutura dos Arquivos e Uso

O projeto está organizado em pastas que demonstram a evolução do aprendizado:

### 📁 aula1: Introdução ao SQLite

Scripts modulares focados nas operações básicas de banco de dados rodando direto no terminal:

- **`createDb.js`**: Apenas abre a conexão e cria o arquivo local do banco de dados (`escola.db`).
- **`createTable.js`**: Conecta ao banco e cria a tabela `alunos` (utilizando a instrução `IF NOT EXISTS` para evitar erros).
- **`insert.js`**: Conecta ao banco, garante a criação da tabela e insere um novo registro (Maria Clara) na tabela `alunos`.
- **`select.js`**: Conecta ao banco, executa uma consulta para buscar todas as linhas da tabela `alunos` e exibe os resultados formatados no console.
- **`index.js`**: O fluxo completo. Conecta ao banco, cria a tabela, insere um registro (Carlos Silva) e em seguida lista todos os alunos cadastrados.

### 📁 aula2: Aplicação Web com Express (Rotas)

Evolui o projeto para uma aplicação web local utilizando o framework **Express**. Organiza os scripts em **rotas HTTP** (como `/insert` e `/select`), permitindo interagir com o banco de dados diretamente pelo navegador.

### 📁 aula3: Templates com EJS

Introduz o uso do motor de **templates EJS**. Separa a lógica do servidor da interface visual, facilitando a criação de páginas dinâmicas renderizando arquivos `.ejs` (na pasta `views`) com os dados das tabelas.

### 📁 CRUD: Aplicação Web Completa com Bootstrap

Aplicação web completa com interface responsiva e profissional, implementando todas as operações de banco de dados via HTTP:

- **`app.js`**: Servidor Express com 6 rotas mapeadas para as operações de CRUD (`GET /`, `POST /insert`, `GET /select`, `GET /update/:id`, `POST /update/:id`, `POST /delete/:id`).
- **`views/insert_form.ejs`**: Formulário de cadastro de novos alunos.
- **`views/list.ejs`**: Tabela responsiva com listagem de alunos, botões de editar e excluir com modal de confirmação.
- **`views/update.ejs`**: Formulário de edição dos dados do aluno.

**Interface construída com:**
- [Bootstrap 5](https://getbootstrap.com/) — layout responsivo, navbar, cards e tabelas
- [Bootstrap Icons](https://icons.getbootstrap.com/) — ícones nos botões e títulos
- Modal de confirmação na exclusão (sem uso de `alert` nativo do navegador)

**Para executar:**
```bash
cd CRUD
node app.js
```
Acesse `http://localhost:3000` no navegador.

---

## 🖥️ Como executar

Para rodar os arquivos, navegue até a pasta da aula desejada e utilize o comando `node` seguido do nome do script no terminal.

Por exemplo, para rodar o fluxo completo da aula 1:

```bash
cd aula1
node index.js
```

Ou, para apenas consultar os dados já inseridos:

```bash
node select.js
```
