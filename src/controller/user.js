import jwt from "jsonwebtoken";
import { User } from "../model/user.js";
import { sendVerificationEmail } from "../email/verificationEmail.js";
import sharp from "sharp";

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
    res.status(200).json({ message: "Email verification successful.", user });
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
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
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

export { createUser, verifyEmail, loginUser, deleteUser, uploadUser };
