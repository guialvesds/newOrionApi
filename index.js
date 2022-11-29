import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";

const app = express();



import userRoute from "./src/routes/user.route.js";
import connectDb from "./src/database/db.js";

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
