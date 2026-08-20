// MODEL — só sabe falar com o banco de dados.
// Não conhece req, res, nem nada de HTTP.
const db = require('../db');

const getAll = (callback) => {
  db.all('SELECT * FROM contatos ORDER BY id DESC', [], callback);
};

const create = (nome, telefone, email, callback) => {
  db.run(
    'INSERT INTO contatos (nome, telefone, email) VALUES (?, ?, ?)',
    [nome, telefone, email],
    callback
  );
};

module.exports = {
  getAll,
  create,
};
