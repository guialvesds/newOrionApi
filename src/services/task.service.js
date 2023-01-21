import Task from "../models/Task.js";

export const addTaskService = (body) => {
  return Task.create(body);
};

export const getTaskService = (listId) => {
  return Task.find({ _listId: listId });
};

export const getTaskByIdService = (idTask) => {
  return Task.findById(idTask);
};

export const editTaskService = (
  id,
  titleTask,
  member,
  delivery_date,
) => {
  return Task.findOneAndUpdate(
    { _id: id },
    { titleTask, member, delivery_date },
    {
      rawResult: true,
    }
  );
};
// export const editTaskService = (taskId, listId, body) => {
//   return Task.findOneAndUpdate(
//     {_id: taskId, listId: listId },
//     { $set: body }
//   );
// }

export const deleteTaskService = (taskId, listId) => {
  return Task.findOneAndRemove({
    _id: taskId,
    listId: listId,
  });
};
