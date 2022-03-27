const express = require('express');
const routes = express.Router();
const controle = require('../controller/RequisicaoCont');

//aqui definem-se as rotas do modulo e o que executar no controller
routes.route('/requisicao').get(controle.listar);
routes.route('/requisicao').post(controle.incluir);
routes.route('/requisicao').put(controle.alterar);
routes.route('/requisicao/:id').delete(controle.excluir);
routes.route('/requisicao/:id').get(controle.obterPeloId);
routes.route('/requisicao/filtro/:filtro').get(controle.filtrar);

module.exports = routes;