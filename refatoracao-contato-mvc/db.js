const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./contatos.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS contatos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    telefone TEXT,
    email TEXT
  )`);
});

module.exports = db;
