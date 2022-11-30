import bcrypt from "bcrypt";
import { loginService, generationToken } from "../services/auth.service.js";

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await loginService(email);

    if(!user) {
      return res.status(404).send({ message: "Email ou senha inválido." });
    }

    const passwordValid = bcrypt.compareSync(password, user.password);

    if(!passwordValid) {
      return res.status(400).send({ message: "Email ou senha inválido." });
    }

    const token = generationToken(user.id)

    res.send({token});
  } catch (error) {
    res.status(500).send(error.message)
  }
};

export { login };
