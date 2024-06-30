import jwt from "jsonwebtoken";
import { User } from "../model/userModel.js";
import { tokenValidation } from "./user.model.validation.js";

const auth = async (req, res, next) => {
  try {
    const accessToken = req.header("Authorization").replace("Bearer ", "");

    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.accessToken": accessToken,
    });

    if (!user) throw new Error();

    req.accessToken = accessToken;
    req.user = user;

    next();
  } catch (e) {
    res.status(401).send({ error: "please Authenticate" });
  }
};
export { auth };
