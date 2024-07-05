import {
  createUser,
  verifyEmail,
  resendEmail,
  loginUser,
  forgetPassword,
} from '../controller/user';
import { User } from '../model/userModel';
import {
  sendVerificationEmail,
  sendResetPassworEmail,
} from '../email/verificationEmail';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {
  createUserValidation,
  loginValidation,
  forgetPasswordValication,
  tokenValidation,
} from '../middleware/user.model.validation';

// Mock dependencies
jest.mock('../model/userModel');
jest.mock('../email/verificationEmail');
jest.mock('../middleware/user.model.validation');
jest.mock('jsonwebtoken');
jest.mock('bcrypt');

describe('User Controller', () => {
  describe('createUser', () => {
    it('should create a user and send a verification email', async () => {
      const req = {
        body: {
          email: 'test@example.com',
          name: 'Test User',
          password: 'Password123!',
        },
      };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      createUserValidation.validateAsync.mockResolvedValue(req.body);
      User.findOne.mockResolvedValue(null);
      User.mockImplementation(() => ({
        save: jest.fn().mockResolvedValue(true),
      }));

      await createUser(req, res);

      expect(User.findOne).toHaveBeenCalledWith({ email: req.body.email });
      expect(User).toHaveBeenCalled();
      expect(sendVerificationEmail).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message:
          'User created successfully. Check your email for verification.',
      });
    });

    it('should return error if email is already in use', async () => {
      const req = {
        body: {
          email: 'test@example.com',
          name: 'Test User',
          password: 'Password123!',
        },
      };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      createUserValidation.validateAsync.mockResolvedValue(req.body);
      User.findOne.mockResolvedValue({});

      await createUser(req, res);

      expect(User.findOne).toHaveBeenCalledWith({ email: req.body.email });
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Email address already in use',
      });
    });
  });

  describe('verifyEmail', () => {
    it('should verify user email', async () => {
      const req = { params: { token: 'validtoken' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      const decodedToken = { _id: 'userId123' };
      tokenValidation.validateAsync.mockResolvedValue(req.params);
      jwt.verify.mockReturnValue(decodedToken);
      User.findByIdAndUpdate.mockResolvedValue({});

      await verifyEmail(req, res);

      expect(tokenValidation.validateAsync).toHaveBeenCalledWith(req.params);
      expect(jwt.verify).toHaveBeenCalledWith(
        req.params.token,
        process.env.JWT_SECRET,
      );
      expect(User.findByIdAndUpdate).toHaveBeenCalledWith(
        decodedToken._id,
        { verified: true },
        { new: true },
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Your email has been verified, go back to login.',
      });
    });

    it('should return error if token is invalid', async () => {
      const req = { params: { token: 'invalidtoken' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      tokenValidation.validateAsync.mockResolvedValue(req.params);
      jwt.verify.mockImplementation(() => {
        throw new Error('Invalid token');
      });

      await verifyEmail(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Invalid or expired token.',
      });
    });
  });

  describe('resendEmail', () => {
    it('should resend verification email', async () => {
      const req = { body: { id: 'userId123' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      const user = { _id: 'userId123', email: 'test@example.com' };
      User.findOne.mockResolvedValue(user);
      jwt.sign.mockReturnValue('newtoken');

      await resendEmail(req, res);

      expect(User.findOne).toHaveBeenCalledWith({ _id: req.body.id });
      expect(sendVerificationEmail).toHaveBeenCalledWith(
        user.email,
        'newtoken',
      );
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: 'new email has been sent',
        _id: user._id,
      });
    });

    it('should return error if user is not found', async () => {
      const req = { body: { id: 'invalidId' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      User.findOne.mockResolvedValue(null);

      await resendEmail(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: "Cannot read properties of null (reading 'email')",
      });
    });
  });

  describe('loginUser', () => {
    it('should log in a verified user', async () => {
      const req = {
        body: { email: 'test@example.com', password: 'Password123!' },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        send: jest.fn(),
      };

      const user = {
        _id: 'userId123',
        email: 'test@example.com',
        password: 'Password123!',
        verified: true,
        generateAuthToken: jest.fn().mockResolvedValue('accessToken'),
        generateRefreshToken: jest.fn().mockResolvedValue('refreshToken'),
      };

      loginValidation.validateAsync.mockResolvedValue(req.body);
      User.findByCredentials.mockResolvedValue(user);

      await loginUser(req, res);

      expect(User.findByCredentials).toHaveBeenCalledWith(
        req.body.email,
        req.body.password,
      );
      expect(res.send).toHaveBeenCalledWith({
        user,
        accessToken: 'accessToken',
        refreshToken: 'refreshToken',
      });
    });

    it('should return error if user is not verified', async () => {
      const req = {
        body: { email: 'test@example.com', password: 'Password123!' },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        send: jest.fn(),
      };

      const user = {
        _id: 'userId123',
        email: 'test@example.com',
        password: 'Password123!',
        verified: false,
      };

      loginValidation.validateAsync.mockResolvedValue(req.body);
      User.findByCredentials.mockResolvedValue(user);

      await loginUser(req, res);

      expect(res.send).toHaveBeenCalledWith('you must verify your email first');
    });
  });

  describe('forgetPassword', () => {
    it('should send a reset password email', async () => {
      const req = { body: { email: 'test@example.com' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        send: jest.fn(),
      };

      const user = {
        _id: 'userId123',
        email: 'test@example.com',
        generateResetPasswordToken: jest.fn().mockResolvedValue('resetToken'),
      };

      forgetPasswordValication.validateAsync.mockResolvedValue(req.body);
      User.findOne.mockResolvedValue(user);

      await forgetPassword(req, res);

      expect(User.findOne).toHaveBeenCalledWith({ email: req.body.email });
      expect(sendResetPassworEmail).toHaveBeenCalledWith(
        req.body.email,
        'resetToken',
      );
      expect(res.send).toHaveBeenCalledWith({
        message:
          'email has been sent to you, check your email to reset your Password',
      });
    });

    it('should return error if user is not found', async () => {
      const req = { body: { email: 'notfound@example.com' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        send: jest.fn(),
      };

      forgetPasswordValication.validateAsync.mockResolvedValue(req.body);
      User.findOne.mockResolvedValue(null);

      await forgetPassword(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Invalid email' });
    });
  });
});
