//script para criar a tabela 'alunos' e inserir um registro usando sqlite3
const sqlite3 = require('sqlite3');

// 1. Abre a conexão (e cria o arquivo escola.db se não existir)
const db = new sqlite3.Database('./escola.db', (erro) => {
    if (erro) return console.error("Erro ao abrir banco:", erro.message);
    console.log("Conectado ao SQLite!");
});


