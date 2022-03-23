const express = require('express');
const routes = express.Router();
const controle = require('../controller/SolicitanteCont');

//aqui definem-se as rotas do modulo e o que executar no controller
routes.route('/solicitantes').get(controle.listar);
routes.route('/solicitantes').post(controle.incluir);
routes.route('/solicitantes').put(controle.alterar);
routes.route('/solicitantes/:id').delete(controle.excluir);
routes.route('/solicitantes/:id').get(controle.obterPeloId);
routes.route('/solicitantes/filtro/:filtro').get(controle.filtrar);

module.exports = routes;