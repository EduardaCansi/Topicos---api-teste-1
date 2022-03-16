const express = require('express');
const routes = express.Router();
const controle = require('../controller/ColaboradorCont');

//aqui definem-se as rotas do modulo e o que executar no controller
routes.route('/colaboradores').get(controle.listar);

module.exports = routes;