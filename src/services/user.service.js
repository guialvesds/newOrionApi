import User from "../models/User.js";

const createService = (body) => {
  return User.create(body);
};

const findAllService = () => {
  return User.find();
};

const findOneService = (id) => {
  return User.findById(id);
};

const editOneService = (id, name, email, password) => {
  return User.findByIdAndUpdate({ _id: id }, { name, email, password });
};

const deleteService = (id) => {
  return User.findByIdAndDelete(id);
};

export default {
  createService,
  findAllService,
  findOneService,
  deleteService,
  editOneService,
};
