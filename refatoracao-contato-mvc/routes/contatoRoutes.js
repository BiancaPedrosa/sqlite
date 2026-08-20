// ROUTES — mapeia cada URL para a função do Controller responsável.
// Nenhuma lógica aqui, só o "endereço".
const express = require('express');
const router = express.Router();
const contatoController = require('../controllers/contatoController');

router.get('/', contatoController.list);
router.post('/contatos', contatoController.create);

module.exports = router;
