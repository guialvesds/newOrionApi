import {
  createService,
  findAllService,
  finCardIdService,
  byUserService,
  updateCardService,
  deleteCardService,
  addCommentService,
  deleteCommentService,
  addMemberService,
  deleteMemberService,
  addTaskService,
  addSubTaskService,
  findSubTaskService,
  editCommentService,
} from "../services/card.service.js";

export const create = async (req, res) => {
  try {
    const {
      title,
      tag,
      created_at,
      delivery_date,
      description,
      comments,
      members,
    } = req.body;

    if (!title) {
      return res.status(400).send({ message: "Titulo é obrigatório." });
    }
    const codRandon = 9999;

    const codeCard = Math.floor(Math.random() * codRandon);

    await createService({
      code: codeCard,
      title,
      tag,
      created_at,
      delivery_date,
      user: req.userId,
      description,
      comments,
      members,
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
        _id: item._id,
        code: item.code,
        title: item.title,
        tag: item.tag,
        created_at: item.created_at,
        delivery_date: item.delivery_date,
        description: item.description,        
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
    const { title, tag, delivery_date, description, tasks, comments, members } =
      req.body;

    const { id } = req.params;

    await updateCardService(
      id,
      title,
      tag,
      delivery_date,
      description,
      tasks,
      comments,
      members
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
    const userName = req.userName.name;

    console.log(userName);

    if (!comment) {
      return res
        .status(400)
        .send({
          message: "Para comentar é necessário enviar um comentário...",
        });
    }

    await addCommentService(id, comment, userId, userName);

    return res.send({ message: "Comentário adicionado com sucesso!" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { idCard, idComment } = req.params;
    const userId = req.userId;
    const userName = req.userName;

    const commenteDeleted = await deleteCommentService(
      idCard,
      idComment,
      userId,
      userName
    );

    console.log(commenteDeleted);

    const commentFinder = commenteDeleted.comments.find(
      (comment) => comment.idComment === idComment
    );

    if (!commentFinder) {
      return res.status(400).send({ message: "Comentário não encontrado." });
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

export const editComment = async (req, res) => {
  try {
    const { idCard, idComment } = req.params;
    const userId = req.userId;
    const {comment} = req.body;

    const commenteEdit = await editCommentService(
      idCard,
      idComment,
      userId,
      comment
    );

    const commentFinder = commenteEdit.comments.find(
      (comment) => comment.idComment === idComment
    );

    if (!commentFinder) {
      return res.status(400).send({ message: "Comentário não encontrado." });
    }

    if (commentFinder.userId !== userId) {
      return res
        .status(400)
        .send({ message: "Você não pode editar esse comentário." });
    }

    return res.send({ message: "Comentário editado com sucesso!" });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

export const addMember = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;
    const { member } = req.body;
    const { memberEmail } = req.body;

    if (!member) {
      return res
        .status(400)
        .send({ message: "É necessário enviar pelo menos um membro." });
    }

    await addMemberService(id, member, memberEmail, userId);

    return res.send({ message: "Membro adicionado com sucesso!" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

export const deleteMember = async (req, res) => {
  try {
    const { idCard, idMember } = req.params;

    await deleteMemberService(idCard, idMember);

    return res.send({ message: "Membro removido com sucesso!" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

export const addTask = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;
    const { title } = req.body;

    if (!title) {
      return res
        .status(400)
        .send({ message: "É necessário inserir um titulo." });
    }

    await addTaskService(id, title, userId);

    res.send({ message: "Task Adiciona com sucesso!" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const findSubTask = async (req, res) => {
  try {
    const { id, idTask } = req.params;

    const data = await findSubTaskService(id, idTask);

    return res.send({ data });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const addSubTask = async (req, res) => {
  try {
    const { id, idTask } = req.params;
    const userId = req.userId;
    const { tarefa } = req.body;

    if (!tarefa) {
      return res
        .status(400)
        .send({ message: "É necessário inserir um titulo." });
    }

    await addSubTaskService(id, idTask, tarefa, userId);

    res.send({ message: "Task Adiciona com sucesso!" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
