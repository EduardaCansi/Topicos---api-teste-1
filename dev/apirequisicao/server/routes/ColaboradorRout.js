const express = require('express');
const routes = express.Router();
const controle = require('../controller/ColaboradorCont');

//aqui definem-se as rotas do modulo e o que executar no controller
routes.route('/colaboradores').get(controle.listar);
routes.route('/colaboradores').post(controle.incluir);
routes.route('/colaboradores').put(controle.alterar);
routes.route('/colaboradores/:id').delete(controle.excluir);
routes.route('/colaboradores/:id').get(controle.obterPeloId);
routes.route('/colaboradores/filtro/:filtro').get(controle.filtrar);

routes.route('/colaboradores/login').post(controle.login);

module.exports = routes;