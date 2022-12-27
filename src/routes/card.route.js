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
  editComment,
  uploadFile,
  deleteFile,
  deleteFileAws,
  updateFileName,
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

//FILE
route.post("/upload/:idCard", storage.single("uploads"), authMiddleware, uploadFile);
route.patch("/fileDelete/:idCard/:idFile", deleteFile);
route.patch("/updateFileName/:idCard/:idFile", updateFileName);
route.delete("/awsDelete/:filename", deleteFileAws);

export default route;
