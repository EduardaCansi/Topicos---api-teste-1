const mongoose = require("mongoose");

const uri =
  "mongodb://admin:admin@localhost:27018/baseprodutos?authSource=baseprodutos";

mongoose.connect(uri, {});
