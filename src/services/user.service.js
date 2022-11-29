const User = require("../models/User");

const createService = (body) => {
  return  User.create(body);
}

const findAllService = () => {
  return User.find();
}

const findOneService = (id) => {
  return User.findById(id);
}

const deleteService = (id) => {
  return User.findByIdAndDelete(id);
}

module.exports = {
  createService,
  findAllService,
  findOneService,
  deleteService
}