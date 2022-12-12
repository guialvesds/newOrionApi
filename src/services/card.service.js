import Card from "../models/Card.js";

export const createService = (body) => {
  return Card.create(body);
};

export const findAllService = () => {
  return Card.find().sort({ _id: -1 }).populate(["user" ,"tasks"]);
};

export const finCardIdService = (_id) => {
  return Card.findById(_id).populate(["user", "tasks"]);
};

export const byUserService = (_id) => {
  return Card.find({ user: _id }).sort({ _id: -1 }).populate(["tasks", "user"]);
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

export const addCommentService = (idCard, comment, userId, userName) => {
  const idComment = Math.floor(Date.now() * Math.random()).toString(25);

  return Card.findOneAndUpdate(
    { _id: idCard },
    {
      $push: {
        comments: {
          idComment,
          userId,
          userName,
          comment,
          created_At: new Date(),
        },
      },
    }
  ).populate("user");
};

export const deleteCommentService = (idCard, idComment, userId) => {
  return Card.findOneAndUpdate(
    { _id: idCard },
    { $pull: { comments: { idComment, userId } } }
  );
};

export const editCommentService = (idCard, idComment, userId,  comment,) => {
  return Card.findOneAndUpdate(
    { _id: idCard },
    { $set: {comments: { idComment, userId, comment, }}}
  );
};

export const addMemberService = (idCard, MemberName, memberEmail, userId) => {
  const idMember = Math.floor(Date.now() * Math.random()).toString(25);

  return Card.findOneAndUpdate(
    { _id: idCard },
    {
      $push: {
        members: {
          idMember,
          userId,
          MemberName,
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

export const findSubTaskService = (idCard, idTask) => {
  return Card.findOne(
    {_id: idCard, idTask: idTask}
    
  );
}

export const addSubTaskService = (idCard, idTask, userId, tarefa) => {
  const idSubTask = Math.floor(Date.now() * Math.random()).toString(25);

  return Card.findOneAndUpdate(
    { _id: idCard, idTask: idTask },    
    {
      $push: {  
        tasks: {      
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
