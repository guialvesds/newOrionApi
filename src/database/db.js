const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

const connectDb = () => {
 
  console.log("Aguarde, conectando ao banco de dados...");

  mongoose
    .connect(
      `mongodb+srv://${DB_USER}:${DB_PASSWORD}@orionapp.mk9sbmy.mongodb.net/?retryWrites=true&w=majority`,
      { useNewUrlParser: true, useUnifiedTopology: true }
    ).then(() => {
      console.log("Conectado ao MongoDB com sucesso!");
    }).catch((error) =>
      console.log("Não foi possível conectar ao MongoDB ", error)
    );
};

module.exports = connectDb;
