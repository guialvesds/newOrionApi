import express from 'express';

import {getList, getListById, addList, editList, deleteList} from "../controllers/list.controller.js"
import {getTask, getTaskById, addTask, editTask, deleteTask} from "../controllers/task.controller.js"

import { authMiddleware } from "../middlewares/auth.middleware.js";

const route = express.Router();

route.get("/", getList);
route.get("/:_id",  getListById);
route.post("/",  authMiddleware, addList);
route.patch("/:_id",  editList);
route.delete("/:_id", deleteList);


//TASKS

route.post("/:listId/task",  authMiddleware, addTask);
route.get("/:listId/task", getTask);
route.get("/:listId/:_id",  getTaskById);
route.patch("/:listId/:_id",  editTask);
route.delete("/:listId/:_id", deleteTask);

export default route;