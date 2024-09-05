import jwt from "jsonwebtoken";
import authConfig from "../config/auth.js";

function ensureAuthenticated(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(400).json({
      message: "JWT token não informado",
    });
  }

  const [, token] = authHeader.split(" ");

  if (!token) {
    return res.status(400).json({
      message: "Token não encontrado",
    });
  }

  console.log("Token recebido:", token);

  try {
    const { sub: user_id } = jwt.verify(token, authConfig.JWT.secret);
    console.log("Secret:", authConfig.JWT.secret);


    req.user = {
      id: Number(user_id),
    };
    return next();
  } catch (error) {
    console.log('Erro de token:', error.message)
    res.status(401).json({
      message: "JWT token inválido!",
    });
  }
}

export default ensureAuthenticated;
