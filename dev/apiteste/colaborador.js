module.exports = (app) => {
    // colocar aqui as rotas para requisições de animais
    const ObjectId = require('mongodb').ObjectId;

    //rota para listar colaborador
    app.get('/colaborador', (req, res) => {
        //res.send('retornar colaborador');
        db.collection('colaborador').find().toArray((err, results) => {
            if (err) throw err;
            res.json(results);
        });
    });

    //rota para inserir colaborador - POST
    app.post('/colaborador', (req, res, next) => {
        db.collection('colaborador').insertOne(req.body, (err, result) => {
            if (err) throw err;
            res.json({ success: "Incluído com sucesso." });
        })
    });


    //rota para alterar colaborador
    app.put('/colaborador', (req, res) => {
        var id = ObjectId(req.body._id);
        var newvalues = {
            $set: {
                nome: req.body.nome,
                email: req.body.tipo,
                senha: req.body.idade
            }
        };
        db.collection('colaborador').updateOne(
            { _id: id },
            newvalues,
            (err, result) => {
                if (err) throw err;
                if (result.modifiedCount < 1)
                    return res.json({ aviso: "Nada alterado." });
                res.json({ success: "Alterado com sucesso." });
            })
    });

    //rota para exclusão
    app.delete('/colaborador/:id', (req, res) => {
        var id = ObjectId(req.params.id);
        db.collection('colaborador').deleteOne({ _id: id }, (err, result) => {
            if (err) throw err;
            if (result.deletedCount < 1)
                return res.json({ aviso: "Nada excluído." });
            res.json({ success: "Excluído com sucesso." });
        });
    });

    //recuperar um unico objeto
    app.get('/colaborador/:id', (req, res) => {
        var id = ObjectId(req.params.id);
        db.collection('colaborador').findOne({ _id: id }, (err, result) => {
            if (err) throw err;
            res.json(result);
        });
    });

    //recuperar com filtro pelo nome ou tipo
    app.get('/colaborador/filtro/:valor', (req, res) => {
        db.collection('colaborador').find({
            $or: [
                { nome: { $regex: req.params.valor, $options: "i" } },
            ],
        }).toArray((err, results) => {
            if (err) throw err;
            res.json(results);
        });
    });
}