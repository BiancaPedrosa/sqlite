// CONTROLLER — liga o Model à View.
// Recebe a requisição, chama o Model, decide o que responder.
const Contato = require('../models/contatoModel');

const list = (req, res) => {
  Contato.getAll((err, linhas) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Erro ao buscar contatos');
    }
    res.render('index', { contatos: linhas });
  });
};

const create = (req, res) => {
  const { nome, telefone, email } = req.body;
  Contato.create(nome, telefone, email, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Erro ao salvar contato');
    }
    res.redirect('/');
  });
};

module.exports = {
  list,
  create,
};
