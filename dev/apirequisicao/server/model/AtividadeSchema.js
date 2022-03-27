const mongoose = require("mongoose");

const AtividadeSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    descricao: { type: String, required: true },
    status: { type: String, required: true },
    prazo: { type: Date },
    agendaInicio: { type: Date },
    dataHoraTermino: { type: Date },
    requisicao: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Requisicao',
        require: true,
    },
    colaborador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Colaborador',
        require: true,
    }
});
module.exports = mongoose.model("Atividade", AtividadeSchema);