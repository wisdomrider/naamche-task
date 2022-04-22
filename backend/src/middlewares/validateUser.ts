import { Request, Response, NextFunction } from "express";
import User from "../schemas/User";
import { generateError } from "../utils/generateError";
export const validateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return generateError(res, "Unauthorized", 401);
  const user = await User.findOne({ token }).lean();
  if (!user) return generateError(res, "Unauthorized", 401);
  res.locals.user = user;
  next();
};
