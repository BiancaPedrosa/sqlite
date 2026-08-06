const express = require('express');
const db = require('./db');

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// LEITURA: lista todos os contatos cadastrados
app.get('/', (req, res) => {
  db.all('SELECT * FROM contatos ORDER BY id DESC', [], (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Erro ao buscar contatos');
    }
    res.render('index', { contatos: rows });
  });
});

// ESCRITA: adiciona um novo contato
app.post('/contatos', (req, res) => {
  const { nome, telefone, email } = req.body;
  db.run(
    'INSERT INTO contatos (nome, telefone, email) VALUES (?, ?, ?)',
    [nome, telefone, email],
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Erro ao salvar contato');
      }
      res.redirect('/');
    }
  );
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
