const mongoose = require("mongoose");
const { float } = require("webidl-conversions");

const ProdutoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  descricao: { type: String },
  estoque: { type: Number, required: true },
  precoUnitario: { type: Number, required: true },
});
module.exports = mongoose.model("Produto", ProdutoSchema);
