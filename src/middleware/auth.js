import jwt from "jsonwebtoken";
import { User } from "../model/userModel.js";
import { tokenValidation } from "./user.model.validation.js";

const auth = async (req, res, next) => {
  try {
    const tokenBeforeValidation = req
      .header("Authorization")
      .replace("Bearer ", "");

    const { token } = await tokenValidation.validateAsync({
      token: tokenBeforeValidation,
    });

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
    res.status(500).send({ message: "please Authenticate" });
  }
};
const secretKey = process.env.secretKey;
const expiresIn = process.env.expiresIn;
const refreshExpiresIn = process.env.refreshExpiresIn;
const authRefreshToken = async (req, res, next) => {
  try {
    const tokenBeforeValidation = req
      .header("Authorization")
      .replace("Bearer ", "");

    const { token } = await tokenValidation.validateAsync({
      token: tokenBeforeValidation,
    });

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

const isAdmin = async (req, res, next) => {
  try {
    const user = req.user;
    if (user.role === "admin" || user.role === "super-admin") {
      return next();
    }
    res.status(400).send({ error: "you're not an admin" });
  } catch (err) {
    res.status(500).send({ error: "internal server error" });
  }
};

export { auth, authRefreshToken, isAdmin };
