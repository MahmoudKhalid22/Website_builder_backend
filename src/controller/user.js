import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { findByEmail } from "../quiries/quiries.js";
import { User } from "../model/userModel.js";
import { sendVerificationEmail } from "../email/verificationEmail.js";
import sharp from "sharp";
import { sendResetPassworEmail } from "../email/resetPasswordEmail.js";

const createUser = async (req, res) => {
  try {
    const user = await new User(req.body);
    await user.save();
    const token = jwt.sign(
      { _id: user._id.toString() },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    sendVerificationEmail(req.body.email, token);
    res.status(201).json({
      message: "User created successfully. Check your email for verification.",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const verifyEmail = async (req, res) => {
  const token = req.params.token;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded._id;

    const user = await User.findByIdAndUpdate(
      userId,
      { verified: true },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    res
      .status(200)
      .json({ message: "Your email has been verified, go back to login." });
  } catch (err) {
    res.status(400).json({ error: "Invalid or expired token." });
  }
};

const loginUser = async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    if (!user.verified) {
      return res.send("you must verify your email first");
    }
    const accessToken = await user.generateAuthToken();
    const refreshToken = await user.generateRefreshToken();
    res.send({ user, accessToken, refreshToken });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const forgetPassword = async (req, res) => {
  const user = await User.findByEmail({ email: req.body.email });
  if (!user) {
    return res.status(400).send("user isn't found");
  }
  const resetToken = await user.generateResetPasswordToken();
  sendResetPassworEmail(req.body.email, resetToken);

  res.send(
    "email has been sent to you, check your email to reset your Password"
  );
};

const resetPassword = async (req, res) => {
  try {
    const token = req.params.token;

    const decoded = await jwt.verify(token, process.env.PASSWORD_TOKEN);
    const userId = decoded._id;
    const hashedPassword = await bcrypt.hash(req.body.password, 8);
    const user = await User.findByIdAndUpdate(
      userId,
      { password: hashedPassword },
      { new: true }
    );
    if (!user) {
      return res.status(404).send("user is not found");
    }
    res.send("password has been updated");
  } catch (err) {
    console.log(err);
    res.status(500).send({ err });
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.deleteOne({ _id: req.user._id }, { new: true });
    res.send({ message: "User has been deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

const uploadUser = async (req, res) => {
  try {
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 300, height: 300 })
      .png()
      .toBuffer();
    console.log(buffer);
    req.user.avatar = buffer;
    await req.user.save();
    res.send("avatar has been added");
  } catch (err) {
    res.status(500).send();
  }
};
const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate({ _id: req.user._id }, { new: true });

    res.send(user);
  } catch (err) {
    res.status(500).json({
      error: "Internal server error",
    });
  }
};
const refreshToken = async (req,res) => {
  try {
    const user = req.user[0]
    const accessToken = await user.generateAuthToken()
    res.send({accessToken})
  }
  catch (err) {
    res.status(500).json({
      error: "Internal server error",
    });
  }
}

export { createUser, verifyEmail, forgetPassword,resetPassword,loginUser, deleteUser, uploadUser,updateUser,refreshToken };
