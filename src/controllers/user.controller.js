import userService from "../services/user.service.js";
// const mongoose = require("mongoose");

const create = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).send({ message: "Todos os campos são obrigatórios!" });
    }

    const user = await userService.createUserService(req.body);

    if (!user) {
      return res
        .status(400)
        .send({ message: "Não foi possivel criar o usuário" });
    }

    return res.status(200).send({ message: "Usário criado com sucesso!", user });
  } catch (error) {
    return res.status(500).send({ message: "Erro ao criar um novo usuário." });
  }
};

const findAll = async (req, res) => {
  try {
    const users = await userService.findUserAllService();

    if (users.length === 0) {
      return res.status(400).send({ message: "Não a usuários registrados" });
    }

    return res.status(200).send(users);
  } catch (error) {
    return res.status(500).send({ message: "Erro ao buscar usuários." });
  }
};

const findOne = async (req, res) => {
  try {

    const { id } = req.params;

    const user =  await userService.findOneUserService(id);

    if(!user){
        return res.status(400).send({message: "Usuário não encontrado."});
    }

    return res.send({ user });

  } catch (error) {
    console.error("Algo deu errado: ", error.message);
  }
};

const editOne = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name && !email && !password) {
      return res
        .status(400)
        .send({ message: "Pelo menos um campo é obrigatório!" });
    }

    const { id, user } = req;

    await userService.editOneUserService(id, name, email, password);

    return res.send({ message: "Usuário alterado com sucesso." });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Não foi possível atualizar o usuário." });
  }
};

const deleteUser = async (req, res) => {
  try {
    await userService.deleteUserService(req.params.id);
    return res.status(200).send({ message: "Ususário excluído com sucesso" });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Não foi possível deletar o usuário." });
  }
};

export default {
  create,
  findAll,
  findOne,
  deleteUser,
  editOne,
};
