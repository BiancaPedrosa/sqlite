const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));

const alunoRoutes = require('./routes/alunoRoutes');
app.use('/', alunoRoutes);

app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));