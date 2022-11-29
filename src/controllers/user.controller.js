const userService = require("../services/user.service");
const mongoose = require("mongoose");

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
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(400).send({ message: "ID Inválido" });
    }

    const user = await userService.findOneService(req.params.id);

    if (!user) {
      res.status(400).send({ message: "Não a usuários registrados" });
    }

    res.status(200).send({ user });
  } catch (error) {
    console.error("Algo deu errado: ", error);
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

module.exports = {
  create,
  findAll,
  findOne,
  deleteUser,
};
