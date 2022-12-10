import { addTaskService, getTaskService, getTaskByIdService } from "../services/task.service.js";

export const addTask = async (req, res) => {
  try {
    const { titleTask } = req.body;

    if (!titleTask) {
      return res.status(400).send({ message: "Título é obrigatório!" });
    }

    await addTaskService({
      titleTask,
      idCard: req.params.id,
      user: req.userId,
    });

    return res.send({ message: "Task Criada com sucesso!" });
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
