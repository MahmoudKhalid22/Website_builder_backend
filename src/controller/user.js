import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../model/userModel.js";
import { sendVerificationEmail } from "../email/verificationEmail.js";
import sharp from "sharp";
import { sendResetPassworEmail } from "../email/resetPasswordEmail.js";
import validator from "validator";
import { sendVerificationUpdatedEmail } from "../email/verificationUpdatedEmail.js";
import { deleteUserPages } from "./page.js";
import SubscriptionPlan from "../model/subPlan.js";
import Message from "../model/message.js";
import { Page } from "../model/pageModel.js";
import { sendMessage } from "../controller/message.js";
import {
  createUserValidation,
  loginValidation,
  forgetPasswordValication,
  resetPasswordValidation,
  tokenValidation,
  nameValidation,
  updatePasswordValidation,
  emailValidation,
} from "../middleware/user.model.validation.js";
import { sendAlertEmail } from "../email/alert.js";

const createUser = async (req, res) => {
  try {
    const result = await createUserValidation.validateAsync(req.body);

    const isExisting = await User.findOne({ email: result.email });
    if (isExisting) throw new Error("Email address already in use");
    if (result.role === "admin") {
      return res.status(400).send({ error: "the role shouldn't be admin" });
    }
    const user = await new User(result);

    await user.save();
    const token = jwt.sign(
      { _id: user._id.toString() },
      process.env.JWT_SECRET,
      { expiresIn: "10m" }
    );

    sendVerificationEmail(req.body.email, token);
    res.status(201).json({
      message: "User created successfully. Check your email for verification.",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const verifyEmail = async (req, res) => {
  const token = await tokenValidation.validateAsync(req.params);
  try {
    const decoded = jwt.verify(token.token, process.env.JWT_SECRET);
    const userId = decoded._id;

    const user = await User.findByIdAndUpdate(
      userId,
      { verified: true },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    res.redirect(
      "https://zagwebbuilder-git-main-m2001saids-projects.vercel.app/en/success-verified"
    );
  } catch (err) {
    res.status(400).json({ error: "Invalid or expired token." });
  }
};

const resendEmail = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) return res.send({ error: "this user isn't found" });
    const token = jwt.sign(
      { _id: user._id.toString() },
      process.env.JWT_SECRET,
      { expiresIn: "10m" }
    );

    sendVerificationEmail(email, token);
    res.status(201).json({
      message: "new email has been sent",
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const result = await loginValidation.validateAsync(req.body);

    const user = await User.findByCredentials(result.email, result.password);
    if (!user.verified) {
      return res.send({ error: "you must verify your email first" });
    }
    const accessToken = await user.generateAuthToken();
    const refreshToken = await user.generateRefreshToken();
    res.send({ user, accessToken, refreshToken });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const forgetPassword = async (req, res) => {
  try {
    const email = await forgetPasswordValication.validateAsync(req.body);
    if (!req.body.email)
      return res.status(400).send({ error: "email is required" });
    const user = await User.findOne({ email: email.email });

    if (!user) {
      return res.status(404).send({ error: "user isn't found" });
    }
    const resetToken = await user.generateResetPasswordToken();
    sendResetPassworEmail(req.body.email, resetToken, user.name);

    res.send({
      message:
        "email has been sent to you, check your email to reset your Password",
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const token = req.params.token;
    const result = await resetPasswordValidation.validateAsync({
      token: token,
      ...req.body,
    });

    const decoded = jwt.verify(result.token, process.env.PASSWORD_TOKEN);
    if (!decoded) throw new Error({ error: "Token has been expired" });
    const userId = decoded._id;
    const hashedPassword = await bcrypt.hash(result.password, 8);
    const user = await User.findByIdAndUpdate(
      userId,
      { password: hashedPassword },
      { new: true }
    );
    if (!user) {
      return res.status(404).send({ error: "user is not found" });
    }
    res.send({ message: "password has been updated" });
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.deleteOne({ _id: req.user._id });
    res.send({ message: "User and associated pages have been deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const uploadUser = async (req, res) => {
  try {
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 300, height: 300 })
      .png()
      .toBuffer();

    const base64Data = buffer.toString("base64");
    const imgsrc = `data:${req.file.mimetype};base64,${base64Data}`;
    req.user.avatar = imgsrc;
    await req.user.save();
    res.send({ avatar: req.user.avatar });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const getAvatar = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).send({ error: "user is not found" });
    }
    res.send({ avatar: user.avatar });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const result = await nameValidation.validateAsync(req.body);
    const user = req.user;
    const newName = await User.findByIdAndUpdate(
      { _id: user._id },
      { name: result.name },
      { new: true }
    );

    res.send({ newName: newName.name });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};
const refreshToken = async (req, res) => {
  try {
    const user = req.user;
    const accessToken = await user.generateAuthToken();
    res.send({ accessToken });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      error: err.message,
    });
  }
};

const getUser = async (req, res) => {
  try {
    const user = req.user;
    res.send({ user });
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
};

const logoutUser = async (req, res) => {
  try {
    if (req.user) {
      req.user.tokens = req.user?.tokens.filter(
        (token) => token.token !== req.token
      );

      await req.user.save();
      return res.send({ message: "You logged out" });
    }

    res.send({ message: "the user is not found" });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

const updatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } =
      await updatePasswordValidation.validateAsync(req.body);

    const user = req.user;
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch)
      return res.status(400).send({ error: "password is not correct" });
    const hashedPassword = await bcrypt.hash(newPassword, 8);
    await User.updateOne(
      { _id: user._id },
      { password: hashedPassword },
      { new: true }
    );
    res.send({ message: "password has been updated successfully" });
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
};

// let newEmail = "";
// const updateEmail = async (req, res) => {
//   try {
//     const email = await emailValidation.validateAsync(req.body);

//     newEmail = email.newEmail;

//     const isValidEmail = validator.isEmail(newEmail);

//     if (!isValidEmail)
//       return res
//         .status(400)
//         .send({ error: "the email provided is not correct" });

//     const isFound = await User.findOne({ email: newEmail });
//     if (isFound)
//       return res.send({ error: "this email is found, try another email" });
//     const user = req.user;

//     const token = await jwt.sign(
//       { id: user._id.toString() },
//       process.env.EMAIL_VERIFICATION_TOKEN,
//       { expiresIn: "10m" }
//     );
//     sendVerificationUpdatedEmail(newEmail, token);
//     res.send({
//       message: "email has been sent to you, please verify your new email",
//     });
//   } catch (err) {
//     res.status(500).send({ err: err.message });
//   }
// };

// const updateEmailAfterVerification = async (req, res) => {
//   const validatedToken = req.params.token;
//   const token = tokenValidation.validateAsync({ token: validatedToken });
//   try {
//     const decoded = await jwt.verify(
//       token,
//       process.env.EMAIL_VERIFICATION_TOKEN
//     );
//     if (!decoded) {
//       return res.status(400).send({ error: "token has been expired" });
//     }
//     await User.updateOne(
//       { id: decoded._id },
//       { email: updateEmail },
//       { new: true }
//     );
//     res.send({ message: "Email has been updated" });
//   } catch (err) {
//     res.status(500).send({ err: err.message });
//   }
// };

const adminGetUsers = async (req, res) => {
  try {
    const query = req.query.role;
    const limit = req.query.limit || 10;
    const offset = req.query.offset || 0;

    if (limit && (limit < 1 || limit > 100)) {
      return res
        .status(400)
        .send({ error: "Invalid limit. Must be between 1 and 100." });
    }

    const users = await User.find({ role: query });

    if (!users) {
      return res
        .status(200)
        .send({ message: "there is no users match this role" });
    }

    const startIndex = +offset;
    const endIndex = +offset + +limit;
    const paginatedUsers = users.slice(startIndex, endIndex);

    res.json({ users: paginatedUsers, allUsers: users.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const adminCreateUser = async (req, res) => {
  try {
    const userData = await createUserValidation.validateAsync(req.body);
    if (userData.role === "super-admin") {
      return res.status(400).send({
        error: "you must not add super admin",
      });
    }
    const newUser = new User({
      name: userData.name,
      email: userData.email,
      password: userData.password,
      role: userData.role,
      verified: true,
    });
    await newUser.save();
    res.status(201).send({ message: "user has been added successfully" });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const adminGetPage = async (req, res) => {
  const pageId = req.params.pageId;
  const userId = req.params.userId;
  const page = await Page.findOne({ owner: userId, _id: pageId });
  try {
    if (!page) {
      return res.status(404).send({ message: "this user has no pages" });
    }
    res.send({ page });
  } catch (error) {
    res.status(500).send({ error: "internal server error" });
  }
};
const adminGetPages = async (req, res) => {
  const userId = req.params.userId;
  const pages = await Page.find({ owner: userId });
  const result = [];
  try {
    if (!pages) {
      return res.status(404).send({ message: "this user has no pages" });
    }
    for (const page of pages) {
      result.push({
        _id: page._id,
        templateInfo: page.templateInfo,
      });
    }
    res.send({ pages: result });
  } catch (error) {
    res.status(500).send({ error: "internal server error" });
  }
};

const adminSendAlert = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findOne({ _id: userId });
    if (!user) return res.status(404).send({ error: "the user is not found" });
    sendAlertEmail(user.email, user.name);
    res.send({ message: "Alert have been sent to user" });
  } catch (err) {
    res.status(500).send({ error: "internal server error" });
  }
};

const adminBlockUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "user is not found" });
    }

    user.status = "blocked";
    await user.save();

    res.json({ message: "User has been blocked successfully" });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const adminUnBlockUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "user is not found" });
    }

    user.status = "active";
    await user.save();

    res.json({ message: "User has been unblocked successfully" });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteAdmin = async (req, res) => {
  try {
    const adminId = req.params.adminId;
    const isSuperAdmin = req.user.role === "super-admin";
    if (!isSuperAdmin) {
      return res.status(400).send({ error: "you're not the super admin" });
    }
    const isAdmin = await User.findOne({ _id: adminId, role: "admin" });
    if (!isAdmin) {
      return res.status(400).send({ error: "this is not an admin" });
    }
    await User.deleteOne({ _id: adminId }, { new: true });
    res.send({ message: "admin has been deleted!" });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const adminDeleteUserPage = async (req, res) => {
  try {
    const pageId = req.params.pageId;
    const userId = req.params.userId;
    const page = await Page.findByIdAndDelete(
      { _id: pageId, owner: userId },
      { new: true }
    );

    if (!page) {
      return res.status(404).send({ error: "the page is not found" });
    }

    res.status(200).send({ message: "page has been deleted successfully" });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const adminDeleteUser = async (req, res) => {
  try {
    const userId = req.params.ID;
    const user = await User.findByIdAndDelete({ _id: userId }, { new: true });

    if (!user) {
      return res.status(404).send({ error: "user is not found" });
    }

    res.send({ message: "user has been deleted" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ error: err.message });
  }
};

//SUBSCRIPTION PLAN

//ADMIN GET ALL MESSAGES

const getAllMessages = async (req, res) => {
  // const user = req.User;
  // console.log(user);
  // if (user.role !== "admin") {
  //   res.send("you are not allowed");
  // }
  const messages = await Message.find({});
  res.json(messages);
};

const getDailymessages = async (req, res) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  try {
    const messages = await Message.find({
      timestamp: { $gte: today },
    });
    res.json(messages);
  } catch (error) {
    console.send({ err: "can't get messages" });
    res.status(500).json({ message: "Server Error" });
  }
};

export {
  createUser,
  verifyEmail,
  forgetPassword,
  resetPassword,
  loginUser,
  deleteUser,
  uploadUser,
  updateUser,
  refreshToken,
  getUser,
  logoutUser,
  updatePassword,
  // updateEmail,
  // updateEmailAfterVerification,
  resendEmail,
  adminGetUsers,
  adminCreateUser,
  adminGetPage,
  adminBlockUser,
  adminSendAlert,
  getAllMessages,
  getDailymessages,
  adminUnBlockUser,
  adminGetPages,
  deleteAdmin,
  adminDeleteUserPage,
  adminDeleteUser,
  getAvatar,
};
