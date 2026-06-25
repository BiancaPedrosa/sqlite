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
    res.render('insert_form');
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
        
        // Enviamos o arquivo 'list.ejs' e injetamos o array 'linhas' dentro da variável 'alunos'
        res.render('list', { alunos: linhas });
    });
});

// ==========================================
// ROTA 4: Editar (GET) - Renderiza o formulário preenchido
// ==========================================
app.get('/update/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM alunos WHERE id = ?';

    db.get(query, [id], (err, aluno) => {
        if (err) {
            console.error(err.message);
            return res.status(500).send('Erro ao buscar aluno.');
        }
        // Garanta que o arquivo na pasta views se chama 'edita.ejs'
        res.render('update', { aluno });
    });
});

// ==========================================
// ROTA 5: Atualizar (POST) - Salva as alterações no banco
// ==========================================
app.post('/update/:id', (req, res) => {
    const { id } = req.params;
    const { nome, idade } = req.body; // Corrigido: usando 'idade' em vez de 'email'
    const query = 'UPDATE alunos SET nome = ?, idade = ? WHERE id = ?'; // Corrigido para a tabela real

    // A ordem no array precisa ser idêntica às '?' do SQL: nome (1º), idade (2º), id (3º)
    db.run(query, [nome, idade, id], (err) => {
        if (err) {
            console.error(err.message);
            return res.status(500).send('Erro ao atualizar aluno.');
        }
        res.redirect('/select'); // Corrigido: redireciona para a sua rota real de listagem
    });
});

// ==========================================
// ROTA 6: Excluir (POST) - Remove o aluno do banco
// ==========================================
app.post('/delete/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM alunos WHERE id = ?';

    db.run(query, [id], (err) => {
        if (err) {
            console.error(err.message);
            return res.status(500).send('Erro ao excluir aluno.');
        }
        res.redirect('/select'); // Redireciona de volta para a listagem
    });
});
app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));