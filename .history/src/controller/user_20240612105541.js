import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '../model/userModel.js';
import { sendVerificationEmail } from '../email/verificationEmail.js';
import sharp from 'sharp';
import { sendResetPassworEmail } from '../email/resetPasswordEmail.js';
import validator from 'validator';
import { createImageFromName } from './image-from-name.js';
import { sendVerificationUpdatedEmail } from '../email/verificationUpdatedEmail.js';
import { deleteUserPages } from './page.js';
import SubscriptionPlan from '../model/subPlan.js';
import Message from '../model/message.js';
import { Page } from '../model/pageModel.js';
import { sendMessage } from '../controller/message.js';
import {
  createUserValidation,
  loginValidation,
  forgetPasswordValication,
  resetPasswordValidation,
  tokenValidation,
  nameValidation,
  updatePasswordValidation,
  emailValidation,
} from '../middleware/user.model.validation.js';

const createUser = async (req, res) => {
  try {
    const result = await createUserValidation.validateAsync(req.body);

    const isExisting = await User.findOne({ email: result.email });
    if (isExisting) throw new Error('Email address already in use');

    const user = await new User(result);

    await createImageFromName(req.body.name);
    await user.save();
    const token = jwt.sign(
      { _id: user._id.toString() },
      process.env.JWT_SECRET,
      { expiresIn: '10m' },
    );

    sendVerificationEmail(req.body.email, token);
    res.status(201).json({
      message: 'User created successfully. Check your email for verification.',
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
      { new: true },
    );

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }
    res
      .status(200)
      .json({ message: 'Your email has been verified, go back to login.' });
  } catch (err) {
    res.status(400).json({ error: 'Invalid or expired token.' });
  }
};

const resendEmail = async (req, res) => {
  const { id } = req.body;
  try {
    const user = await User.findOne({ _id: id });
    const email = user.email;
    const token = jwt.sign(
      { _id: user._id.toString() },
      process.env.JWT_SECRET,
      { expiresIn: '10m' },
    );

    sendVerificationEmail(email, token);
    res.status(201).json({
      message: 'new email has been sent',
      _id: user._id,
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
      return res.send('you must verify your email first');
    }
    const accessToken = await user.generateAuthToken();
    const refreshToken = await user.generateRefreshToken();
    res.send({ user, accessToken, refreshToken });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const forgetPassword = async (req, res) => {
  try {
    const email = await forgetPasswordValication.validateAsync(req.body);
    if (!req.body.email)
      return res.status(400).send({ error: 'email is required' });
    const user = await User.findOne({ email: email.email });

    if (!user) {
      return res.status(404).send({ error: "user isn't found" });
    }
    const resetToken = await user.generateResetPasswordToken();
    sendResetPassworEmail(req.body.email, resetToken);

    res.send({
      message:
        'email has been sent to you, check your email to reset your Password',
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

    console.log(result);
    const decoded = await jwt.verify(result.token, process.env.PASSWORD_TOKEN);
    if (!decoded) throw new Error({ error: 'Token has been expired' });
    const userId = decoded._id;
    const hashedPassword = await bcrypt.hash(result.password, 8);
    const user = await User.findByIdAndUpdate(
      userId,
      { password: hashedPassword },
      { new: true },
    );
    if (!user) {
      return res.status(404).send({ error: 'user is not found' });
    }
    res.send({ message: 'password has been updated' });
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.deleteOne({ _id: req.user._id }); // this to delete the user

    await deleteUserPages(req.user._id); // to user's pages

    res.send({ message: 'User and associated pages have been deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const uploadUser = async (req, res) => {
  try {
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 300, height: 300 })
      .png()
      .toBuffer();
    req.user.avatar = buffer;
    await req.user.save();
    res.send('avatar has been added');
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
};
const updateUser = async (req, res) => {
  try {
    const name = await nameValidation.validateAsync(req.body);
    const user = await User.findByIdAndUpdate(
      { _id: result },
      { name: name.name },
      { new: true },
    );

    res.send(user);
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
        (token) => token.token !== req.token,
      );

      await req.user.save();
      return res.send({ message: 'You logged out' });
    }

    res.send({ message: 'the user is not found' });
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
      return res.status(400).send({ error: 'password is not correct' });
    const hashedPassword = await bcrypt.hash(newPassword, 8);
    await User.updateOne(
      { _id: user._id },
      { password: hashedPassword },
      { new: true },
    );
    res.send({ message: 'password has been updated successfully' });
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
};

let newEmail = '';
const updateEmail = async (req, res) => {
  try {
    const email = await emailValidation.validateAsync(req.body);

    newEmail = email.newEmail;

    const isValidEmail = validator.isEmail(newEmail);

    if (!isValidEmail)
      return res
        .status(400)
        .send({ error: 'the email provided is not correct' });

    const isFound = await User.findOne({ email: newEmail });
    if (isFound)
      return res.send({ error: 'this email is found, try another email' });
    const user = req.user;

    const token = await jwt.sign(
      { id: user._id.toString() },
      process.env.EMAIL_VERIFICATION_TOKEN,
      { expiresIn: '10m' },
    );
    sendVerificationUpdatedEmail(newEmail, token);
    res.send({
      message: 'email has been sent to you, please verify your new email',
    });
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
};

const updateEmailAfterVerification = async (req, res) => {
  const validatedToken = req.params.token;
  const token = tokenValidation.validateAsync({ token: validatedToken });
  try {
    const decoded = await jwt.verify(
      token,
      process.env.EMAIL_VERIFICATION_TOKEN,
    );
    if (!decoded) {
      return res.status(400).send({ error: 'token has been expired' });
    }
    await User.updateOne(
      { id: decoded._id },
      { email: updateEmail },
      { new: true },
    );
    res.send({ message: 'Email has been updated' });
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
};

const adminGetUsers = async (req, res) => {
  try {
    const users = await User.find({}).sort({
      role: {
        $cond: {
          if: { $eq: ['$role', 'premium'] },
          then: 0,
          else: {
            $cond: { if: { $eq: ['$role', 'admin'] }, then: 1, else: 2 },
          },
        },
      },
    });
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const adminCreateUser = async (req, res) => {
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
    verified: true,
  });
  newUser
    .save()
    .then((user) => res.json(user))
    .catch((err) => res.status(500).send(err));
};

const adminGetPage = async (req, res) => {
  const pageId = req.params.pageId;
  const page = await Page.findById(pageId);
  try {
    const user = await User.findById(page.owner);
    if (!user) {
      return res.status(404).send('User not found');
    }

    if (user.role !== 'admin') {
      return res.status(403).send('Unauthorized access');
    }
    res.send(page);
  } catch (error) {
    console.log({ error: 'Error fetching user' });
    res.status(500).send('Server Error');
  }
};

const adminSendMsg = (req, res) => {
  const isAdmin = req.user.role === 'admin';

  if (!isAdmin) {
    return res.status(403).send('Unauthorized');
  }

  const userId = req.params.userId;

  res.redirect('/message');

  // Here you would implement the logic to send a message to the user with the given userId
  // Example: Send message to user with ID userId
  // sendMessageToUser(userId, req.body.message);
  res.send('Message sent to user');
};

const adminSendAlert = (req, res) => {
  const isAdmin = req.user && req.user.role === 'admin';

  if (!isAdmin) {
    return res.status(403).send('Unauthorized');
  }

  const userId = req.params.userId;
  // const userId = req.body.userId;

  // Here you would implement the logic to send an alert to the user with the given userId
  // Example: Send alert to user with ID userId
  // sendAlertToUser(userId, req.body.alertMessage);

  res.send('Alert sent to user'); // Send a response indicating that the alert was sent
};

const adminBlockUser = async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.blocked = true;
    await user.save();

    res.json({ message: 'User blocked successfully' });
  } catch (err) {
    res.status(500).json({ err: 'Internal Server Error' });
  }
};

//SUBSCRIPTION PLAN

// Create a new subscription plan
const newPlan = async (req, res) => {
  try {
    const plan = await SubscriptionPlan.create(req.body);
    res.status(201).json(plan);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all subscription plans
const getAllPlans = async (req, res) => {
  try {
    const plans = await SubscriptionPlan.find();
    res.json(plans);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a subscription plan
const updatePlan = async (req, res) => {
  try {
    const plan = await SubscriptionPlan.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    res.json(plan);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a subscription plan
const deletePlan = async (req, res) => {
  try {
    await SubscriptionPlan.findByIdAndDelete(req.params.id);
    res.json({ message: 'Subscription plan deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

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
    res.status(500).json({ message: 'Server Error' });
  }
};
function Sayhello() {
  return 'hello jest';
}
module.exports = Sayhello;

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
  updateEmail,
  updateEmailAfterVerification,
  resendEmail,
  adminGetUsers,
  adminCreateUser,
  adminGetPage,
  adminBlockUser,
  adminSendMsg,
  adminSendAlert,
  newPlan,
  getAllPlans,
  updatePlan,
  deletePlan,
  getAllMessages,
  getDailymessages,
};
