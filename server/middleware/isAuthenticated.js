import { handleError } from "../helpers/handleError.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, _, next) => {
  try {
    const token = req.cookies.token
      ? req.cookies.token
      : req.headers["authorization"] &&
        req.headers["authorization"].split(" ")[1] !== "null"
      ? req.headers["authorization"].split(" ")[1]
      : null;

    // if (!token) {
    //   return next(handleError(403, "Unauthorized user."));
    // }
    const decoded = jwt.decode(token, process.env.SECRET_KEY);
    if (!decoded) {
      return next(handleError(403, "Unauthorized user."));
    }
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    return next(handleError(500, "Internal server error."));
  }
};
