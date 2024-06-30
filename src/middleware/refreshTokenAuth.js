import jwt from "jsonwebtoken";
import { User } from "../model/userModel.js";
import { tokenValidation } from "./user.model.validation.js";

const authRefreshToken = async (req, res, next) => {
  try {
    const refreshToken = req.header("Authorization").replace("Bearer ", "");

    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET_KEY
    );

    const user = await User.findOne({
      _id: decoded._id,
      "tokens.refreshToken": refreshToken,
    });

    if (!user) throw new Error();

    req.refreshToken = refreshToken;
    req.user = user;

    next();
  } catch (e) {
    res.status(401).send({ error: e.message });
  }
};

export { authRefreshToken };
