import { addTaskService, getTaskService, getTaskByIdService } from "../services/task.service.js";

export const addTask = async (req, res) => {
  try {
    const { idCard } = req.params;
    const userId = req.userId;
    const { titleTask } = req.body;


    if (!titleTask) {
      return res
        .status(400)
        .send({ message: "É necessário inserir um titulo." });
    }

    const data ={
      cardId: "6397b9590171adc9fb9b8f1f",
      titleTask: titleTask,
      user: userId
    }

    console.log("cardID", idCard);

    await addTaskService({...data});

    res.send({ message: "Task Adiciona com sucesso!" });
  } catch (error) {
    return res.send(error.message);
  }
};

export const getTask = async (req, res) => {
  try {
   const data = await getTaskService();

    return res.send({ data });
  } catch (error) {
    return res.send(error.message);
  }
};

export const getTaskById = async (req, res) => {
  try {
    const idTask = req.params;

    const data = await getTaskByIdService(idTask);

  return res.send({data})

  } catch (error) {
    return res.send(error.message);
  }
}
