import { Router } from "express";
const route = Router();

import {
  create,
  findAll,
  findCarId,
  byUser,
  updateCard,
  deleteCard,
  addComment,
  deleteComment,
  addMember,
  deleteMember,
  addTask,
  addSubTask,
  findSubTask,
  editComment,
  uploadFile
} from "../controllers/card.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {storage} from "../multer/multer.config.js";

// const upload = multer({storage: storage})

// All CARD
route.post("/", authMiddleware, create); // Cria um novo Card
route.get("/:id", authMiddleware, findCarId); // Busca um card pelo ID
route.get("/", authMiddleware, findAll); // Busca todos os Cards
route.patch("/:id", authMiddleware, updateCard); // Altera qualquer informação do card
route.get("/byUser", authMiddleware, byUser); // Busca os cards criados pelo user
route.delete("/:id", authMiddleware, deleteCard); // Deleta um Card
//COMENTÁRIO
route.patch("/comment/:id", authMiddleware, addComment); // Adiciona um comentário no card
route.patch("/comment/:idCard/:idComment", authMiddleware, deleteComment); // Deleta um comentário do card
route.patch("/editComment/:idCard/:idComment", authMiddleware, editComment)
//MEMBRO
route.patch("/member/:id", authMiddleware, addMember); // Adiciona um membro ao card
route.patch("/member/:idCard/:idMember", authMiddleware, deleteMember); // Deleta um membro do Card
//TASK
route.patch("/task/:id", authMiddleware, addTask); // Adiciona uma nova task
// route.patch("/task/:idCard/:idTask", authMiddleware, deleteTask); // Deleta uma task
route.patch("/subTask/:idCard/:idTask", authMiddleware, addSubTask); // Adiciona uma subTask
route.get("/subTask/:idCard/:idTask", authMiddleware, findSubTask); // Busca uma subTask
// route.patch("/task/:idCard/:idTask/:idSubTask", authMiddleware, deleteSubTask); // Deleta uma subTask

//UPLOAD FILE
route.post("/upload/:idCard", storage.single("uploads"), authMiddleware, uploadFile);

export default route;
