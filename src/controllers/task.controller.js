import {
    addTaskService,
    getTaskByIdService,
    getTaskService,
    editTaskService,
    deleteTaskService,
  } from "../services/task.service.js";
  
  import Task from "../models/Task.js";
  
  export const addTask = async (req, res) => {
    try {
      const { titleTask } = req.body;      
  
      const data = new Task({
        titleTask,         
        listId: req.params.listId,
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
    try {
      const listId = req.params.listId;
      const idTask = req.params.taskId;
     
      await Task.findOneAndUpdate({
        _id: idTask, 
        listId: listId
      }, {
        $set: req.body
      });
  
      return res.send({ message: "Task alterada com sucesso!"});
    } catch (error) {
      return res.send(error.message);
    }
  };
  
  export const deleteTask = async (req, res) => {
    const id = req.params;
  
    await deleteTaskService(id);
  
    return res.send({ message: "Task excluída com sucesso!" });
  };
  