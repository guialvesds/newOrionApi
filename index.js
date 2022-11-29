const express = require("express");
const cors = require("cors");

const app = express();

require("dotenv").config();

const userRoute = require("./src/routes/user.route");
const connectDb = require("./src/database/db");

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};

connectDb();
app.use(cors(corsOptions));
app.use(express.json());

app.use("/user", userRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Serviço rodando na porta: ${PORT}`);
});
