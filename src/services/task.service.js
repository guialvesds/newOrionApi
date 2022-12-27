import Task from "../models/Task.js"

export const addTaskService = (body) => {
  return Task.create(body);
};

export const getTaskService = (listId) => {
  return Task.find({listId: listId});
}

export const getTaskByIdService = (idTask) => {
return Task.findById(idTask);
}

export const editTaskService = (id, title) => {
  return Task.findOneAndUpdate(
    { _id: id },
    { title } 
  );
}

export const deleteTaskService = (id) => {
  return Task.deleteOne(id);
}
