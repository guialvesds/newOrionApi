import express from 'express';

import userController from "../controllers/user.controller.js";
import { validID, validUser } from "../middlewares/global.middlewares.js";
import { authMiddleware } from '../middlewares/auth.middleware.js';

import { storage } from "../multer/multer.config.js";

const route = express.Router();

route.post("/", userController.create);
route.get("/", userController.findAll);
route.get("/:id", validID, validUser, userController.findOne);
route.patch("/:id", validID, validUser, userController.editOne);
route.delete("/:id", userController.deleteUser);

// Upload Avatar

route.post("/upload/:userId/:fileName",  storage.single("uploads"), authMiddleware, userController.uploadFile);

export default route;
