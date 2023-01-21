import {
  addTaskService,
  getTaskByIdService,
  getTaskService,
  editTaskService,
  deleteTaskService,
} from "../services/task.service.js";

import Task from "../models/Task.js";
import List from "../models/List.js";

export const addTask = async (req, res) => {
  try {
    const { titleTask, member, delivery_date } = req.body;

    const data = new Task({
      titleTask,
      member,
      delivery_date,
      _listId: req.params.listId,
    });

    console.log(data);

    await addTaskService(data);

    return res.send(data);

    // res.send({ message: "Task Adiciona com sucesso!" });
  } catch (error) {
    return res.send(error.message);
  }
};

export const getTask = async (req, res) => {
  try {
    const listId = req.params.listId;

    const data = await getTaskService(listId);

    return res.send({ data });
  } catch (error) {
    return res.send(error.message);
  }
};

export const getTaskById = async (req, res) => {
  try {
    const idTask = req.params;

    const data = await getTaskByIdService(idTask);

    return res.send({ data });
  } catch (error) {
    return res.send(error.message);
  }
};

export const editTask = async (req, res) => {
  // We want to update an existing task (specified by taskId)

  List.findOne({
    _id: req.params.listId,
  })
    .then((list) => {
      if (list) {
        // list object with the specified conditions was found
        // therefore the currently authenticated user can make updates to tasks within this list
        return true;
      }

      // else - the list object is undefined
      return false;
    })
    .then((canUpdateTasks) => {
      if (canUpdateTasks) {
        // the currently authenticated user can update tasks
        Task.findOneAndUpdate(
          {
            _id: req.params.taskId,
            _listId: req.params.listId,
          },
          {
            $set: req.body,
          }
        ).then(() => {
          res.send({ message: "Updated successfully." });
        });
      } else {
        res.sendStatus(404);
      }
    });
};

export const deleteTask = async (req, res) => {
  const _id = req.params.taskId;
  const _listId = req.params.listId;

  await deleteTaskService(_id, _listId);

  return res.send({ message: "Task excluída com sucesso!" });
};

export const deleteTaskList = async (req, res) => {
  try {
    const listId = '63cb29365e8dbc03981ddf29';

    Task.remove({_listId: '63cb29365e8dbc03981ddf29'});

    return res.send({ message: "Tarefas removidas com sucesso!" });
  } catch (error) {
    return res.send(error)
  }
};
