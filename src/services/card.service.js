import Card from "../models/Card.js";

export const createService = (body) => {
  return Card.create(body);
};

export const findAllService = () => {
  return Card.find().sort({ _id: -1 }).populate("user");
};

export const finCardIdService = (id) => {
  return Card.findById(id).populate("user");
};

export const byUserService = (id) => {
  return Card.find({ user: id }).sort({ _id: -1 }).populate("user");
};

export const updateCardService = (
  id,
  title,
  tag,
  delivery_date,
  description,
  tasks,
  comments,
  members
) => {
  return Card.findOneAndUpdate(
    { _id: id },
    { title, tag, delivery_date, description, tasks, comments, members },
    {
      rawResult: true,
    }
  );
};

export const deleteCardService = (id) => {
  return Card.findOneAndDelete({ _id: id });
};

export const addCommentService = (idCard, comment, userId) => {
  const idComment = Math.floor(Date.now() * Math.random()).toString(25);

  return Card.findOneAndUpdate(
    { _id: idCard },
    {
      $push: {
        comments: {
          idComment,
          userId,
          comment,
          created_At: new Date(),
        },
      },
    }
  );
};

export const deleteCommentService = (idCard, idComment, userId) => {
  return Card.findOneAndUpdate(
    { _id: idCard },
    { $pull: { comments: { idComment, userId } } }
  );
};

export const addMemberService = (idCard, member, memberEmail, userId) => {
  const idMember = Math.floor(Date.now() * Math.random()).toString(25);

  return Card.findOneAndUpdate(
    { _id: idCard },
    {
      $push: {
        members: {
          idMember,
          userId,
          member,
          memberEmail,
          created_At: new Date(),
        },
      },
    }
  );
};

export const deleteMemberService = (idCard, idMember) => {
  return Card.findOneAndUpdate(
    { _id: idCard },
    { $pull: { members: { idMember } } }
  );
};

export const addTaskService = (idCard, title, userId) => {
  const idTask = Math.floor(Date.now() * Math.random()).toString(25);

  return Card.findOneAndUpdate(
    { _id: idCard },
    {
      $push: {
        tasks: {
          idTask,
          title,
          userId,
          created_At: new Date(),
        },
      },
    }
  );
};

export const addSubTaskService = (idCard, idTask, userId, tarefa) => {
  const idSubTask = Math.floor(Date.now() * Math.random()).toString(25);

  return Card.findOneAndUpdate(
    { _id: idCard },    
    {
      $push: {
        tasks: {
          idTask,
          subTask: {
            idSubTask,
            tarefa,
            userId,
            created_At: new Date(),
          },
        },
      },
    }
  );
};
