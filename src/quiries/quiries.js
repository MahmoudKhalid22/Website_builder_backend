import { User } from "../model/userModel.js";

export const findByEmail = async (email) => {
  const user = await User.findOne({ email: email });
  console.log(user);
  if (!user) return false;
  return user;
};
