const express = require('express');
const routes = express.Router();
const controle = require('../controller/LoginCont');

//aqui definem-se as rotas do modulo e o que executar no controller

routes.route('/login').post(controle.login);

module.exports = routes;