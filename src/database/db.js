import mongoose from "mongoose";

mongoose.Promise = global.Promise;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

const connectDb = () => {
 
  console.log("Aguarde, conectando ao banco de dados...");

  mongoose
    .connect(
      `mongodb+srv://admin:gvGfkUcv9WLWYma2@orionapp.mk9sbmy.mongodb.net/?retryWrites=true&w=majority`,
      { useNewUrlParser: true, useUnifiedTopology: true }
    ).then(() => {
      console.log("Conectado ao MongoDB com sucesso!");
    }).catch((error) =>
      console.log("Não foi possível conectar ao MongoDB ", error)
    );
};

export default connectDb;
