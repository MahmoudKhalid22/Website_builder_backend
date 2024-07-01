import mongoose, { mongo } from "mongoose";
import jwt from "jsonwebtoken";
import { User } from "../../src/model/userModel";

const userOneId = new mongoose.Types.ObjectId();
const adminOneId = new mongoose.Types.ObjectId();
const userOne = {
  _id: userOneId,
  name: "Mahmoud",
  email: "mahmoudkhalid0122@gmail.com",
  password: "mahmoud444$",
  role: "user",
  verified: true,
  tokens: [
    {
      accessToken: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET),
      refreshToken: jwt.sign(
        { _id: userOneId },
        process.env.REFRESH_TOKEN_SECRET_KEY
      ),
    },
  ],
};

const adminOne = {
  _id: adminOneId,
  name: "Mahmoud",
  email: "mahmoudkhalid0122+1@gmail.com",
  password: "mahmoud444$",
  role: "admin",
  verified: true,
  tokens: [
    {
      accessToken: jwt.sign({ _id: adminOneId }, process.env.JWT_SECRET),
      refreshToken: jwt.sign(
        { _id: adminOneId },
        process.env.REFRESH_TOKEN_SECRET_KEY
      ),
    },
  ],
};

const setupDatabase = async () => {
  await User.deleteMany();
  await User.create(userOne);
  await User.create(adminOne);
};

export { userOneId, adminOneId, userOne, adminOne, setupDatabase };
