import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import userService from "../services/user.service.js";

dotenv.config();

export const authMiddleware = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    console.log(authorization);

    if (!authorization) {
      return res.send(401);
    }

    const parts = authorization.split(" ");

    if (parts.length !== 2) {
      return res.send(401);
    }

    const [schema, token] = parts;

    if (schema !== "Bearer") {
      return res.send(401);
    }

    jwt.verify(token, process.env.SECRET, async (error, decoded) => {
      if (error) {
        return res.status(401).send({ message: "Token inválido!" });
      }
      const user = await userService.findOneUserService(decoded.id);

      if (!user || !user.id) {
        return res.status(401).send({ message: "Usuário sem autentiação." });
      }

      req.userId = user.id;
      
      return next();
    });
  } catch (error) {
    return res.send(error.message);
  }
};
