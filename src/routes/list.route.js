import express from 'express';

import {getList, getListById, addList, editList, deleteList, getListCard} from "../controllers/list.controller.js"
import {getTask, getTaskById, addTask, editTask, deleteTask, deleteTaskList} from "../controllers/task.controller.js"

import { authMiddleware } from "../middlewares/auth.middleware.js";

const route = express.Router();

//LIST
route.get("/", getList);
route.get("/:idCard/lists", getListCard);
route.get("/:_id",  getListById);
route.post("/:idCard",  authMiddleware, addList);
route.patch("/:_id",  editList);
route.delete("/:_id", deleteList);

//TASKS
route.post("/:listId/task",  authMiddleware, addTask);
// route.get("/:listId/:_id",  getTaskById);
route.patch("/:listId/task/:taskId",  editTask);
route.get("/:listId/tasks", getTask);
route.delete("/:listId/task/:taskId", deleteTask);
route.delete("/:listId/delete-task", deleteTaskList);

export default route;