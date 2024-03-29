import List from "../models/List.js";
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
  editCommentService,
  uploadFilesServices,
  deleteFileService,
  updateFileNameService,
} from "../services/card.service.js";

import aws from "aws-sdk";

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
      files,
      list
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
      files,
      list
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
        user: item.user,
        created_at: item.created_at,
        delivery_date: item.delivery_date,
        description: item.description,
        comments: item.comments,
        members: item.members,
        tasks: item.list,
        files: item.files,
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
    const { title, tag, delivery_date, description, tasks, comments, members,files } =
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
      members,
      files
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
    const avatar = req.avatar

    console.log(userName);

    if (!comment) {
      return res.status(400).send({
        message: "Para comentar é necessário enviar um comentário...",
      });
    }

    await addCommentService(id, comment, userId, userName, avatar);

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
    const { comment } = req.body;

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
    const { memberName } = req.body;
    const { memberEmail } = req.body;

    if (!memberName) {
      return res
        .status(400)
        .send({ message: "É necessário enviar pelo menos um membro." });
    }

    await addMemberService(id, memberName, memberEmail, userId);

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

export const uploadFile = async (req, res) => {
  try {
    const { idCard } = req.params;
    const userId = req.userId;

    const location = req.file.location;
    const type = location.slice(location.length - 4);

    const detail = {
      originalname: req.file.originalname,
      location: req.file.location,
      type: type,
      key: req.file.key,
    };

    if (!detail) {
      return res
        .status(400)
        .send({ message: "É necessário enviar pelo menos um arquivo." });
    }

    await uploadFilesServices(idCard, userId, detail);

    console.log(detail);
    console.log(type);
    console.log(req.file.key);

    return res.send({ message: "Arquivo adicionado com sucesso!" });
  } catch (error) {
    return res.status(500).send({ "error ao enviar arquivo": error.message });
  }
};

export const deleteFile = async (req, res) => {
  try {
    const { idCard, idFile } = req.params;

    await deleteFileService(idCard, idFile);

    return res.send({ message: "Arquivo removido do banco de dados com sucesso!" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};
export const deleteFileAws = async (req, res) => {
  try {
    const s3 = new aws.S3();
    const filename = req.params.filename;

    await s3
      .deleteObject({
        Bucket: "orionapp-files",
        Key: filename,
      })
      .promise();  

    return res.send({ message: "removido da aws com sucesso!" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

export const updateFileName = async (req, res) => {
  try {

    const {idCard, idFile} = req.params;
   
    const  {userId, created_at } = req.body;

    const detail = {
      originalname: req.body.originalname, 
      location: req.body.location, 
      type: req.body.type, 
      key: req.body.key,
    }

    await updateFileNameService(idCard, idFile, userId, created_at, detail);

    return res.send({message: "Campo alterado com sucesso!"});
    
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
}
