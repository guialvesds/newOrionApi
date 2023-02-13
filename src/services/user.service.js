import User from "../models/User.js";

import aws from "aws-sdk";

 const createUserService = (body) => {
  return User.create(body);
};

 const findUserAllService = () => {
  return User.find();
};

 const findOneUserService = (id) => {
  return User.findById(id);
};

 const editOneUserService = (id, name, email, password, member, selected ) => {
  return User.findByIdAndUpdate({ _id: id }, { name, email, password, member, selected  });
};

const deleteUserService = (id) => {
  return User.findByIdAndDelete(id);
};

const uploadImageAvatarService = (userId, detail) => {

  const idFile = Math.floor(Date.now() * Math.random()).toString(25);

  return User.findOneAndUpdate(
    { _id: userId },
    {
      $push: {
        avatar: {
          userId:userId, 
          idFile: idFile,
          detail: detail,         
          created_at: new Date(),
        },
      },
    }
  );
}

const deleteImageAvatarService = (userId) => {
   return User.findOneAndUpdate(
      {_id: userId},
      {$pull: {avatar: {userId}}}
    );
}

const deleteAvatarS3 = async (fileName) => {  
  const s3 = new aws.S3();  

  await s3
    .deleteObject({
      Bucket: "orionapp-files",
      Key: fileName,
    })
    .promise();  
  }


export default {
  createUserService,
  findUserAllService,
  findOneUserService,
  deleteUserService,
  editOneUserService,
  uploadImageAvatarService,
  deleteImageAvatarService,
  deleteAvatarS3
};
