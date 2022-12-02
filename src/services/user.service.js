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

 const editOneUserService = (id, name, email, password) => {
  return User.findByIdAndUpdate({ _id: id }, { name, email, password });
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
