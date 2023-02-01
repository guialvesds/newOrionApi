import Card from "../models/Card.js";

export const createService = (body) => {
  return Card.create(body);
};

export const findAllService = () => {
  return Card.find().sort({ _id: -1 }).populate("user");
};

export const finCardIdService = (_id) => {
  return Card.findById(_id).populate("user");;
};

export const byUserService = (_id) => {
  return Card.find({ user: _id }).sort({ _id: -1 }).populate("user");
};

export const updateCardService = (
  id,
  title,
  tag,
  delivery_date,
  description,
  tasks,
  comments,
  members,
  files,
) => {
  return Card.findOneAndUpdate(
    { _id: id },
    { title, tag, delivery_date, description, tasks, comments, members, files },
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

export const editCommentService = (idCard, idComment, userId, comment) => {
  return Card.findOneAndUpdate(
    { _id: idCard },
    { $set: { comments: { idComment, userId, comment } } }
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

export const uploadFilesServices = (idCard, userId, detail) => {
  const idFile = Math.floor(Date.now() * Math.random()).toString(25);

  return Card.findOneAndUpdate(
    { _id: idCard },
    {
      $push: {
        files: {
          idFile: idFile,
          detail: detail,
          userId: userId,
          created_at: new Date(),
        },
      },
    }
  );
};

export const deleteFileService = (idCard, idFile) => {
  return Card.findOneAndUpdate(
    { _id: idCard },
    { $pull: { files: { idFile } } }
  );
};

export const updateFileNameService = (idCard, idFile, userId, created_at, detail) => {
  return Card.findOneAndUpdate({_id: idCard},
    { $set: {
      files: {
        idFile: idFile,
        detail,
        userId: userId,   
        created_at: created_at, 
    }}});
}
