import User from "../models/User.js";

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

export default {
  createUserService,
  findUserAllService,
  findOneUserService,
  deleteUserService,
  editOneUserService,
};
