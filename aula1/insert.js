//script para criar a tabela 'alunos' e inserir um registro usando sqlite3
const sqlite3 = require('sqlite3');

// 1. Abre a conexão (e cria o arquivo escola.db se não existir)
const db = new sqlite3.Database('./escola.db', (erro) => {
    if (erro) return console.error("Erro ao abrir banco:", erro.message);
    console.log("Conectado ao SQLite!");

    // 2. CRIA A TABELA usando 'IF NOT EXISTS' para não dar erro se a tabela já estiver lá
     db.run(`CREATE TABLE IF NOT EXISTS alunos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT,
        idade INTEGER
    )`, (erro) => {
          if (erro) return console.error("Erro ao criar tabela:", erro.message);
          console.log("Tabela pronta para uso!");
     });

     // 3. Inserir o aluno
     const novosAluno = ["Maria Clara", 15];
     const sql = 'INSERT INTO alunos (nome, idade) VALUES (?,?)';
     db.run(sql, novosAluno, function(erro) {
          if (erro) return console.error("Erro ao inserir:", erro.message);
          console.log(`Sucesso! Aluno ID: ${this.lastID}`);
     });
});       
