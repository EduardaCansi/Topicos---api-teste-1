const { Router } = require("express");
const routes = Router();

// Liberar origens para requisições
var cors = require("cors");
routes.use(cors({ origin: "*" }));
//routes.use(cors({origin: 'http://localhost:3001'}));

//rotas para cada modulo
const produtoRout = require("./ProdutoRout");
routes.use("/api", produtoRout);

module.exports = routes;
