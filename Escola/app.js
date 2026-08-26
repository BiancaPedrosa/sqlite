const express = require('express');
const path = require('path');
// Importando as rotas do aluno
const alunoRoutes = require('./routes/alunoRoutes');
// Importando as rotas do curso
const cursoRoutes = require('./routes/cursoRoutes');

// Criando o servidor Express
const app = express();
const PORT = 3000;

// CONFIGURAÇÃO DO EJS (Indica ao Express qual motor usar e onde estão as telas)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
// Configuração para receber dados de formulários
app.use(express.urlencoded({ extended: true }));
// Rota inicial com barra de navegação para alunos e cursos
app.get('/', (req, res) => res.render('index'));

//configuração para usar as rotas do aluno
app.use('/aluno', alunoRoutes);
//configuração para usar as rotas do curso
app.use('/curso', cursoRoutes);

app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));