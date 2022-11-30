import {
  createService,
  findAllService,
  finCardIdService,
  byUserService,
  updateCardService,
  deleteCardService,
  addCommentService,
  deleteCommentService,
} from "../services/card.service.js";

export const create = async (req, res) => {
  try {
    const {
      code,
      title,
      tag,
      created_at,
      delivery_date,
      description,
      tasks,
      comments,
    } = req.body;

    if (!title) {
      return res.status(400).send({ message: "Titulo é obrigatório." });
    }

    await createService({
      code,
      title,
      tag,
      created_at,
      delivery_date,
      user: req.userId,
      description,
      tasks,
      comments,
    });

    return res.send(201);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

export const findAll = async (req, res) => {
  try {
    const card = await findAllService();

    if (card.length === 0) {
      return res.status(400).send({ message: "Cards não encontrados" });
    }

    return res.send({
      data: card.map((item) => ({
        id: item._id,
        code: item.code,
        title: item.title,
        tag: item.tag,
        created_at: item.created_at,
        delivery_date: item.delivery_date,
        description: item.description,
        tasks: item.tasks,
        comments: item.comments,
      })),
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

export const findCarId = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await finCardIdService(id);

    if (!data) {
      return res.send({ message: "Card não encontrado!" });
    }

    return res.send({ data });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

export const byUser = async (req, res) => {
  try {
    const id = req.userId;

    const data = await byUserService(id);

    return res.send({ data });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

export const updateCard = async (req, res) => {
  try {
    const { title, tag, delivery_date, description, tasks, comments } =
      req.body;

    const { id } = req.params;

    await updateCardService(
      id,
      title,
      tag,
      delivery_date,
      description,
      tasks,
      comments
    );

    return res.send({ message: "Card alterado com sucesso!" });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

export const deleteCard = async (req, res) => {
  try {
    const { id } = req.params;

    await deleteCardService(id);

    return res.send({ message: "Card excluído com sucesso!" });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

export const addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;
    const { comment } = req.body;

    if (!comment) {
    return  res
        .status(400)
        .send({
          message: "Para comentar é necessário enviar um comentário...",
        });
    }

    await addCommentService(id, comment, userId);

    return res.send({ message: "Comentário adicionado com sucesso!" });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { idCard, idComment } = req.params;
    const userId = req.userId;

    const commenteDeleted = await deleteCommentService(
      idCard,
      idComment,
      userId
    );

    console.log(commenteDeleted);

    const commentFinder = commenteDeleted.comments.find((comment) => comment.idComment === idComment);

    if(!commentFinder){
      return res.status(400).send({message: "Comentário não encontrado."});
    }

    if (commentFinder.userId !== userId) {
      return res
        .status(400)
        .send({ message: "Você não pode deletar esse comentário." });
    }

    return res.send({ message: "Comentário revomido com sucesso!" });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
