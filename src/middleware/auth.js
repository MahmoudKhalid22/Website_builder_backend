import jwt from "jsonwebtoken";
import { User } from "../model/userModel.js";

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!user) throw new Error();

    req.token = token;
    req.user = user;

    next();
  } catch (e) {
    res.status(500).send("please Authenticate");
  }
};
const secretKey = process.env.secretKey;
const expiresIn = process.env.expiresIn;
const refreshExpiresIn = process.env.refreshExpiresIn;
const authRefreshToken = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET_KEY);
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!user) throw new Error();

    req.token = token;
    req.user = user;

    next();
  } catch (e) {
    res.status(500).send("please Authenticate");
  }
};



export { auth,authRefreshToken };
