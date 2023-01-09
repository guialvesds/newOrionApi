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

export const editTaskService = (taskId, listId, titleTask) => {
  return Task.findOneAndUpdate(
    {_id: taskId, listId: listId },
    { $set: titleTask } 
  );
}

export const deleteTaskService = (id) => {
  return Task.deleteOne(id);
}
