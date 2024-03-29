import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import userService from "../services/user.service.js";

dotenv.config();

export const authMiddleware = (req, res, next) => {
  try {
    const { authorization } = req.headers;   

    if (!authorization) {
      return res.status(401).json({message: "Token inválido. au"});
    }

    const parts = authorization.split(" ");

    if (parts.length !== 2) {
      return res.status(401).json({message: "Token inválido. pa"});
    }

    const [schema, token] = parts;

    if (schema !== "Bearer") {
      return res.status(401).json({message: "Token inválido. sc"});
    }

    jwt.verify(token, process.env.SECRET, async (error, decoded) => {
      if (error) {
        return res.status(401).send({ message: "Token inválido! er" });
      }

      console.log("Error token ER ", error);
      const user = await userService.findOneUserService(decoded.id);

      if (!user || !user.id) {
        return res.status(401).send({ message: "Usuário sem autentiação." });
      }

      req.userId = user.id; 
      req.userName = user; 
      req.avatar = user.avatar;     
           
      return next();
    });
  } catch (error) {
    return res.send(error.message);
  }
};
