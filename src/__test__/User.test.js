// user.test.js
// import request from 'supertest';
// import app from '../app'; // Assuming you have an Express app in app.js
import { User } from '../model/userModel';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

describe('User Controller', () => {
  let server;
  beforeAll(() => {
    server = app.listen(3000);
  });

  afterAll((done) => {
    mongoose.connection.close(() => {
      server.close(done);
    });
  });

  describe('createUser', () => {
    it('should create a new user and send verification email', async () => {
      const response = await request(server).post('/user').send({
        name: 'Test User',
        email: 'testuser@example.com',
        password: 'Test@1234',
      });

      expect(response.status).toBe(201);
      expect(response.body.message).toBe(
        'User created successfully. Check your email for verification.',
      );

      const user = await User.findOne({ email: 'testuser@example.com' });
      expect(user).not.toBeNull();
    });

    it('should return error if email already exists', async () => {
      await new User({
        name: 'Existing User',
        email: 'existing@example.com',
        password: 'Existing@1234',
      }).save();

      const response = await request(server).post('/user').send({
        name: 'New User',
        email: 'existing@example.com',
        password: 'NewUser@1234',
      });

      expect(response.status).toBe(500);
      expect(response.body.error).toBe('Email address already in use');
    });
  });

  describe('loginUser', () => {
    it('should login a user with correct credentials', async () => {
      const password = await bcrypt.hash('Test@1234', 8);
      const user = await new User({
        name: 'Login User',
        email: 'login@example.com',
        password: password,
        verified: true,
      }).save();

      const response = await request(server).post('/user/login').send({
        email: 'login@example.com',
        password: 'Test@1234',
      });

      expect(response.status).toBe(200);
      expect(response.body.user).not.toBeNull();
      expect(response.body.accessToken).not.toBeNull();
    });

    it('should return error for unverified email', async () => {
      const password = await bcrypt.hash('Test@1234', 8);
      await new User({
        name: 'Unverified User',
        email: 'unverified@example.com',
        password: password,
        verified: false,
      }).save();

      const response = await request(server).post('/user/login').send({
        email: 'unverified@example.com',
        password: 'Test@1234',
      });

      expect(response.status).toBe(200);
      expect(response.text).toBe('you must verify your email first');
    });
  });

  // Add more test cases for other controller methods...
});
