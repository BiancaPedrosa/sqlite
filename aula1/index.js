// index.js requer o módulo sqlite3 para trabalhar com bancos de dados SQLite
const sqlite3 = require('sqlite3');

// 1. Abre a conexão (e cria o arquivo escola.db se não existir)
const db = new sqlite3.Database('./escola.db', (erro) => {
    if (erro) return console.error("Erro ao abrir banco:", erro.message);
    console.log("Conectado ao SQLite!");

    // 2. CRIA A TABELA usando 'IF NOT EXISTS' para não dar erro se a tabela já existir
     db.run(`CREATE TABLE IF NOT EXISTS alunos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT,
        idade INTEGER
    )`, (erro) => {
          if (erro) return console.error("Erro ao criar tabela:", erro.message);
          console.log("Tabela pronta para uso!");
     });

     // 3. Inserir o aluno
     const sql = 'INSERT INTO alunos (nome, idade) VALUES (?, ?)';
     db.run(sql, ["Carlos Silva", 15], function(erro) {
          if (erro) return console.error("Erro ao inserir:", erro.message);
          console.log(`Sucesso! Aluno ID: ${this.lastID}`);
     });

     // 4. Executa a consulta
    // 'db.all' busca todas as linhas da tabela
    db.all('SELECT * FROM alunos', (erro, alunos) => {
        if (erro) {
            // Tratamento de erros fundamental
            return console.error("Erro na consulta:", erro.message);
        }

        // 5. Exibe os resultados no console
        console.log("Lista de Alunos:");
        alunos.forEach((aluno) => {
            console.log(`ID: ${aluno.id} - Nome: ${aluno.nome} - Idade: ${aluno.idade}`);
        });
    });
});

// Fecha o banco após a operação
db.close();
