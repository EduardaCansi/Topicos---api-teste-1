const mongoose = require("mongoose");

const AndamentoSchema = new mongoose.Schema({
    dataHoraTermino: { type: Date },
    titulo: { type: String, required: true },
    descricao: { type: String, required: true },
    atividade: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Atividade',
        require: true,
    },
    colaborador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Colaborador',
        require: true,
    }
});
module.exports = mongoose.model("Andamento", AndamentoSchema);