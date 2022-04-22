import { Request, Response } from "express";
import User from "../schemas/User";
import { generateError } from "../utils/generateError";
export const userRegister = async (req: Request, res: Response) => {
  try {
    let user = await User.create(req.body);

    res.json({
      created: true,
      username: user.username,
    });
  } catch (e) {
    return generateError(res, e, 400);
  }
};

export const userLogin = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return generateError(res, "User not found");
    const isMatch = await user.validatePassword(req.body.password);
    if (!isMatch) return generateError(res, "Wrong password");
    const token = user.generateToken();
    user.token = token;
    await user.save();
    res.send({ token, username: user.username, name: user.name });
  } catch (e) {
    console.log(e);
    return generateError(res, "Something went wrong");
  }
};

export const getUserNames = async (req: Request, res: Response) => {
  try {
    const users = await User.find(
      {
        $text: { $search: req.params.search },
      },
      ["username"]
    );

    res.json(
      users.filter((user) => user.username !== res.locals.user.username)
    );
  } catch (e) {
    console.log(e);
    return generateError(res, "Something went wrong");
  }
};
