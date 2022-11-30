import { Router } from "express";
const route = Router();

import {create, findAll, findCarId, byUser, updateCard, deleteCard, addComment,deleteComment } from "../controllers/card.controller.js"
import {authMiddleware} from "../middlewares/auth.middleware.js"

route.post("/", authMiddleware, create);
route.get("/", authMiddleware, findAll);
route.get("/byUser", authMiddleware, byUser);
route.get("/:id", authMiddleware, findCarId);
route.patch("/:id", authMiddleware, updateCard);
route.delete("/:id", authMiddleware, deleteCard);
route.patch("/comment/:id", authMiddleware, addComment);
route.patch("/comment/:idCard/:idComment", authMiddleware, deleteComment);

export default route;