import mysqlConnection from "../../database/mysql/mysqlConnect.js";
import bcrypt from "bcrypt";
import * as yup from "yup";

class CreateUserController {
  async create(req, res) {
    const schemaCreateUser = yup.object().shape({
      firstName: yup.string().required("O nome é obrigatório"),
      email: yup
        .string()
        .email("Digite um email válido")
        .required("O email é obrigatório"),
      password: yup
        .string()
        .min(6, "A senha deve conter no mínimo 6 caracteres")
        .required("Digite uma senha"),
    });

    try {
      await schemaCreateUser.validate(req.body);

      const { firstName, email, password } = req.body;

      const database = mysqlConnection;

      const [checkUserExist] = await database.query(
        "SELECT * FROM users WHERE email = (?)",
        [email]
      );

      console.log("Resultado da consulta de existência:", [checkUserExist]);

      if (checkUserExist.length > 0) {
        return res.status(401).json({ message: "Esse email já está em uso." });
      }

      const hashedPassword = await bcrypt.hash(password, 8);

      const [result] = await database.query(
        "INSERT INTO users (firstName, email, password) VALUES (? ,?, ?)",
        [firstName, email, hashedPassword]
      );

      return res.status(201).json({ message: "Usuário criado com sucesso" });
    } catch (error) {
      return res.status(400).json({
        errors: error.errors,
      });
    }
  }
}

export default CreateUserController;
