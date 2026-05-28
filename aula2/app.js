const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const PORT = 3000;

// Configura o Express para conseguir ler dados enviados por formulários (POST)
app.use(express.urlencoded({ extended: true }));

// 1. Inicializa o Banco de Dados e garante que a tabela exista
const db = new sqlite3.Database('./escola.db', (erro) => {
    if (erro) return console.error("Erro ao abrir o banco:", erro.message);
    
    db.run(`CREATE TABLE IF NOT EXISTS alunos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT,
        idade INTEGER
    )`, (erro) => {
        if (erro) return console.error("Erro ao criar tabela:", erro.message);
        console.log("Banco de dados e tabela prontos!");
    });
});

// ROTA PRINCIPAL: Página Inicial / Painel
app.get('/', (req, res) => {
    res.send(`
        <h1>Sistema de Escola (SQLite + Express)</h1>
        <p>Escolha uma opção:</p>
        <ul>
            <li><a href="/insert">Cadastrar Novo Aluno</a></li>
            <li><a href="/select">Ver Alunos Cadastrados</a></li>
        </ul>
    `);
});

// ROTA INSERT (GET): Exibe o Formulário HTML de Cadastro
app.get('/insert', (req, res) => {
    res.send(`
        <h2>Cadastrar Novo Aluno</h2>
        <form action="/insert" method="POST">
            <label>Nome do Aluno:</label><br>
            <input type="text" name="nome" placeholder="Ex: Ana Silva" required><br><br>
            
            <label>Idade:</label><br>
            <input type="number" name="idade" placeholder="Ex: 16" required><br><br>
            
            <button type="submit">Salvar Aluno</button>
        </form>
        <br>
        <a href="/">Voltar para o Início</a>
    `);
});

// ROTA INSERT (POST): Recebe os dados do formulário e salva no banco
app.post('/insert', (req, res) => {
    // Captura as variáveis vindas do formulário pelo 'name' dos inputs
    const { nome, idade } = req.body;
    const sql = 'INSERT INTO alunos (nome, idade) VALUES (?, ?)';

    db.run(sql, [nome, idade], function(erro) {
        if (erro) {
            console.error("Erro ao inserir:", erro.message);
            return res.send(`<h2>Erro ao salvar o aluno.</h2> <a href="/insert">Tentar novamente</a>`);
        }
        
        // Retorna uma resposta de sucesso amigável com link de retorno
        res.send(`
            <h2>Aluno ${nome} cadastrado com sucesso! (ID: ${this.lastID})</h2>
            <a href="/insert">Cadastrar outro aluno</a> | <a href="/select">Ver todos</a>
        `);
    });
});

// ROTA SELECT (GET): Busca os alunos no banco e lista na tela
app.get('/select', (req, res) => {
    const sql = 'SELECT * FROM alunos';

    db.all(sql, [], (erro, linhas) => {
        if (erro) {
            console.error("Erro ao buscar:", erro.message);
            return res.send("<h2>Erro ao buscar dados no banco.</h2>");
        }

        // Se não houver alunos cadastrados ainda
        if (linhas.length === 0) {
            return res.send(`<h2>Nenhum aluno cadastrado.</h2> <a href="/insert">Cadastrar o primeiro</a>`);
        }

        // Monta uma lista HTML iterando pelos registros retornados
        let listaHtml = '<h2>Lista de Alunos Cadastrados</h2><ul>';
        linhas.forEach((aluno) => {
            listaHtml += `<li><strong>ID:</strong> ${aluno.id} | <strong>Nome:</strong> ${aluno.nome} | <strong>Idade:</strong> ${aluno.idade} anos</li>`;
        });
        listaHtml += '</ul><br><a href="/">Voltar para o Início</a>';

        res.send(listaHtml);
    });
});

// Inicia o servidor web na porta 3000
app.listen(PORT, () => {
    console.log(`Servidor rodando em: http://localhost:${PORT}`);
});