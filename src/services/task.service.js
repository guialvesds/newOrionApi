import Task from "../models/Task.js";

export const addTaskService = (body) => {
  return Task.create(body);
};

export const getTaskService = (body) => {
  return Task.find();
}

export const getTaskByIdService = (idTask) => {
return Task.findOne(idTask);
}
