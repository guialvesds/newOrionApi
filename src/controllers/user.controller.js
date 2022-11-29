import  userService  from "../services/user.service.js";
// const mongoose = require("mongoose");

const create = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400).send({ message: "Todos os campos são obrigatórios!" });
    }

    const user = await userService.createService(req.body);

    if (!user) {
      return res
        .status(400)
        .send({ message: "Não foi possivel criar o usuário" });
    }

    res.status(200).send({ message: "Usário criado com sucesso!", user });
  } catch (error) {
    res.status(500).send({ message: "Erro ao criar um novo usuário." });
  }
};

const findAll = async (req, res) => {
  try {
    const users = await userService.findAllService();

    if (users.length === 0) {
      res.status(400).send({ message: "Não a usuários registrados" });
    }

    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({ message: "Erro ao buscar usuários." });
  }
};

const findOne = async (req, res) => {
  try {
    const user = req.user;
    res.status(200).send({ user });
  } catch (error) {
    console.error("Algo deu errado: ", error);
  }
};

const editOne = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name && !email && !password) {
      res.status(400).send({ message: "Pelo menos um campo é obrigatório!" });
    }

    const { id, user } = req;

    await userService.editOneService(id, name, email, password);

    res.send({ message: "Usuário alterado com sucesso." });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Não foi possível atualizar o usuário." });
  }
};

const deleteUser = async (req, res) => {
  try {
    await userService.deleteService(req.params.id);
    res.status(200).send({ message: "Ususário excluído com sucesso" });
  } catch (error) {
    res.status(500).send({ message: "Não foi possível deletar o usuário." });
  }
};

export default {
  create,
  findAll,
  findOne,
  deleteUser,
  editOne,
};
