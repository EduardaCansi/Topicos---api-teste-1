const mongoose = require("mongoose");

const RequisicaoSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    descricao: { type: String, required: true },
    dataHoraCriada: { type: Date },
    status: { type: String, required: true },
    prazoAtendimento: { type: Date },
    tipoRequisicao: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TipoRequisicao',
        require: true,
    },
    solicitante: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Solicitante',
        require: true,
    }
});
module.exports = mongoose.model("Requisicao", RequisicaoSchema);