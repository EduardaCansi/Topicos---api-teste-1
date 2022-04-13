console.log("Server executado com sucesso");

// usar o express
const express = require('express');

// usar o momgo
require("./server/banco/mongo");
// Usar as rotas
const routes = require('./server/routes/index');

const app = express();

//liberar origens para requisição
var cors = require('cors');

app.use(express.json()); // para tratar json

routes.use(cors({origin: '*'}));
//routes.use(cors({origin: 'http://localhost:3001'}));

// definir porta para a API de serviço
const port = process.env.PORT || 3000;

app.use(routes);

app.listen(port, () => {
 return console.log('API executando na porta ' + port);
});