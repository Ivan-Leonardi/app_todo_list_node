import { verify } from "jsonwebtoken";
import authConfig from "../config/auth";

function ensureAuthenticated(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(400).json({
      message: "JWT token não informado",
    });
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(token, authConfig.JWT.secret);

    req.user = {
      id: Number(user_id),
    };
    return next();
  } catch (error) {
    res.status(401).json({
      message: "JWT token inválido!",
    });
  }
}

export default ensureAuthenticated;
