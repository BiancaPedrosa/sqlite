const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
// Criando o servidor Express
const app = express();
const PORT = 3000;

// CONFIGURAÇÃO DO EJS (Indica ao Express qual motor usar e onde estão as telas)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
// Configuração para receber dados de formulários
app.use(express.urlencoded({ extended: true }));

// Conexão com o Banco de Dados
const db = new sqlite3.Database('./escola.db', (erro) => {
    if (erro) return console.error(erro.message);
    db.run(`CREATE TABLE IF NOT EXISTS alunos (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, idade INTEGER)`);
});

// ROTA 1: Formulário
app.get('/', (req, res) => {
    // res.render procura na pasta 'views' pelo arquivo 'formulario.ejs'
    res.render('formulario');
});

// ROTA 2: Inserir
app.post('/insert', (req, res) => {
    const { nome, idade } = req.body; 
    const sql = 'INSERT INTO alunos (nome, idade) VALUES (?, ?)';
    
    db.run(sql, [nome, idade], function(erro) {
        if (erro) return res.send("Erro ao salvar.");
        res.redirect('/select');
    });
});

// ROTA 3: Selecionar e Exibir
app.get('/select', (req, res) => {
    db.all('SELECT * FROM alunos', (erro, linhas) => {
        if (erro) return res.send("Erro ao buscar.");
        
        // Enviamos o arquivo 'lista.ejs' e injetamos o array 'linhas' dentro da variável 'alunos'
        res.render('lista', { alunos: linhas });
    });
});

app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));