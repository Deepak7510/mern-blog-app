import { handleError } from "../helpers/handleError.js";

const isAdmin = async (req, _, next) => {
  try {
    const user = req.user;
    if (user.role !== "admin") {
      return next(handleError(403, "Unauthorized user."));
    }
    next();
  } catch (error) {
    console.error(error);
    next(handleError(error));
  }
};

export default isAdmin;
