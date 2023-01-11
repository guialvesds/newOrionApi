import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";

import connectDb from "./src/database/db.js";


import userRoute from "./src/routes/user.route.js";
import authRoute from "./src/routes/auth.route.js";
import cardRoute from "./src/routes/card.route.js";
import listRoute from "./src/routes/list.route.js"

dotenv.config();

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};

const app = express();

connectDb();
app.use(cors(corsOptions));
app.use(express.json());
// app.use(bodyParser);

app.use("/user", userRoute);
app.use("/auth", authRoute);
app.use("/card", cardRoute);
app.use("/lists", listRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Serviço rodando na porta: ${PORT}`);
});
