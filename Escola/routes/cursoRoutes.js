const express = require('express');
const cursoController = require('../controllers/cursoController');
const router = express.Router();

// ROTA 1: Formulário
router.get('/', cursoController.showForm);

// ROTA 2: Inserir
router.post('/insert', cursoController.insert);

// ROTA 3: Selecionar e Exibir
router.get('/select', cursoController.list);

// ROTA 4: Editar (GET) - Renderiza o formulário preenchido
router.get('/update/:id', cursoController.editForm);

// ROTA 5: Atualizar (POST) - Salva as alterações no banco
router.post('/update/:id', cursoController.update);

// ROTA 6: Excluir (POST) - Remove o curso do banco
router.post('/delete/:id', cursoController.remove);

module.exports = router;
