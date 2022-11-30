import User from "../models/User.js";
import jwt from "jsonwebtoken";

const loginService = (email) => {
  return User.findOne({ email: email }).select("+password");
};

const generationToken = (id) => {
    return jwt.sign({id: id}, process.env.SECRET, {expiresIn: 86400})
}

export { loginService, generationToken };
