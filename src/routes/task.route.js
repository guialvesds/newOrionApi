import express from 'express';

import {addTask, getTask, getTaskById} from "../controllers/task.controller.js"
import { authMiddleware } from "../middlewares/auth.middleware.js";

const route = express.Router();

route.post("/:id", authMiddleware  ,addTask);
route.get("/", authMiddleware, getTask);
route.get("/:id", authMiddleware, getTaskById);

export default route;