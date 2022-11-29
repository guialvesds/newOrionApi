import mongoose from "mongoose";
import userService from "../services/user.service.js";

export const validID = (req, res, next) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).send({ message: "ID Inválido" });
  }

  next();
};

export const validUser = async (req, res, next) => {
  const id = req.params.id;

  const user = await userService.findOneService(id);

  if (!user) {
    return res.status(400).send({ message: "Usuário não encontrado!" });
  }

  req.id = id;
  req.user = user;
 

  next();
};

 
