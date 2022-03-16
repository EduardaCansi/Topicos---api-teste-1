const mongoose = require("mongoose");

const uri = "mongodb://admin:admin@localhost:27018/baseRequisicao?authSource=baseRequisicao";

mongoose.connect(uri, {});