const Produto = require("../model/ProdutoSchema");

module.exports = {
  listar: async (req, res) => {
    Produto.find((err, objetos) => {
      err ? res.status(400).send(err) : res.status(200).json(objetos);
    }).sort({ nome: 1 }); // -1 decrescente 1 crescente
  },

  incluir: async (req, res) => {
    let obj = new Produto(req.body);
    obj.save((err, obj) => {
      err ? res.status(400).send(err) : res.status(200).json(obj);
    });
  },

  alterar: async (req, res) => {
    let obj = new Produto(req.body);
    Produto.updateOne({ _id: obj._id }, obj, function (err) {
      err ? res.status(400).send(err) : res.status(200).json(obj);
    });
  },

  excluir: async (req, res) => {
    Produto.deleteOne({ _id: req.params.id }, function (err) {
      err ? res.status(400).send(err) : res.status(200).json("message:ok");
    });
  },

  obterPeloId: async (req, res) => {
    Produto.findOne({ _id: req.params.id }, function (err, objetos) {
      err ? res.status(400).send(err) : res.status(200).json(objetos);
    });
  },

  filtrar: async (req, res) => {
    Produto.find(
      {
        $or: [
          { nome: { $regex: req.params.filtro, $options: "i" } },
          { descricao: { $regex: req.params.filtro, $options: "i" } },
        ],
      },
      function (err, objetos) {
        err ? res.status(400).send(err) : res.status(200).json(objetos);
      }
    );
  },
};
