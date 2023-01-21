import {
  addListService,
  getListByIdService,
  getListService,
  editListService,
  deleteListService,
  getListCardService,
} from "../services/list.service.js";

import List from "../models/List.js";

export const addList = async (req, res) => {
  try {
    const { title, idCard } = req.body;
    const idUser = req.userId;

    const data = new List({
      title,
      idCard,
      idUser,
    });

    await addListService(data);

    return res.send(data);

    // res.send({ message: "Task Adiciona com sucesso!" });
  } catch (error) {
    return res.send(error.message);
  }
};

export const getList = async (req, res) => {
  try {
    const data = await getListService();

    return res.send({ data });
  } catch (error) {
    return res.send(error.message);
  }
};

export const getListCard = async (req, res) => {
  try {
    const idCard = req.params.idCard;

    const data = await getListCardService(idCard);

    return res.send({data});

  } catch (error) {
    return res.send(error.message);
  }
}

export const getListById = async (req, res) => {
  try {
    const idTask = req.params;

    const data = await getListByIdService(idTask);

    return res.send({ data });
  } catch (error) {
    return res.send(error.message);
  }
};

export const editList = async (req, res) => {
  try {
    const id = req.params;
    const title = req.body.title;

    await editListService(id, title);

    return res.send({ message: "Lista alterada com sucesso!" });
  } catch (error) {
    return res.send(error.message);
  }
};

export const deleteList = async (req, res) => {
  const id = req.params;

  await deleteListService(id);

  return res.send({ message: "Lista excluída com sucesso!" });
};

