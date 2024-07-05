import { expect } from 'chai';
import request from 'supertest';
import app from '../index.js'; // Update the path as necessary
import { User } from '../model/userModel.js'; // Update the path as necessary
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

describe('User Controller', () => {
  let user;
  let token;

  before(async () => {
    // Create a user for testing
    user = new User({
      name: 'Test User',
      email: 'testuser@example.com',
      password: 'password123',
      verified: true,
    });
    await user.save();

    // Generate a JWT token for the user
    token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);
  });

  after(async () => {
    // Cleanup test user
    await User.deleteMany({});
  });

  describe('POST /users', () => {
    it('should create a new user', async () => {
      const res = await request(app).post('/users').send({
        name: 'New User',
        email: 'newuser@example.com',
        password: 'newpassword123',
      });
      expect(res.status).to.equal(201);
      expect(res.body).to.have.property('message');
    });

    it('should return 500 for duplicate email', async () => {
      const res = await request(app).post('/users').send({
        name: 'New User',
        email: 'testuser@example.com',
        password: 'newpassword123',
      });
      expect(res.status).to.equal(500);
      expect(res.body).to.have.property('error');
    });
  });

  describe('POST /users/login', () => {
    it('should login a user', async () => {
      const res = await request(app).post('/users/login').send({
        email: 'testuser@example.com',
        password: 'password123',
      });
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('user');
      expect(res.body).to.have.property('accessToken');
      expect(res.body).to.have.property('refreshToken');
    });

    it('should return 500 for invalid credentials', async () => {
      const res = await request(app).post('/users/login').send({
        email: 'testuser@example.com',
        password: 'wrongpassword',
      });
      expect(res.status).to.equal(500);
      expect(res.body).to.have.property('message');
    });
  });

  describe('POST /users/forget-password', () => {
    it('should send a reset password email', async () => {
      const res = await request(app).post('/users/forget-password').send({
        email: 'testuser@example.com',
      });
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('message');
    });

    it('should return 404 for non-existent email', async () => {
      const res = await request(app).post('/users/forget-password').send({
        email: 'nonexistent@example.com',
      });
      expect(res.status).to.equal(404);
      expect(res.body).to.have.property('error');
    });
  });

  describe('PATCH /users/reset-password/:token', () => {
    it('should reset the password', async () => {
      const resetToken = jwt.sign(
        { _id: user._id.toString() },
        process.env.PASSWORD_TOKEN,
        { expiresIn: '1h' }
      );

      const res = await request(app)
        .patch(`/users/reset-password/${resetToken}`)
        .send({
          password: 'newpassword123',
        });

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('message');

      // Verify the password was updated
      const updatedUser = await User.findById(user._id);
      const isMatch = await bcrypt.compare('newpassword123', updatedUser.password);
      expect(isMatch).to.be.true;
    });

    it('should return 500 for invalid or expired token', async () => {
      const invalidToken = 'invalidtoken';

      const res = await request(app)
        .patch(`/users/reset-password/${invalidToken}`)
        .send({
          password: 'newpassword123',
        });

      expect(res.status).to.equal(500);
      expect(res.body).to.have.property('err');
    });
  });

  describe('DELETE /users', () => {
    it('should delete the user', async () => {
      const res = await request(app)
        .delete('/users')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('message');

      // Verify the user was deleted
      const deletedUser = await User.findById(user._id);
      expect(deletedUser).to.be.null;
    });

    it('should return 500 if user not found', async () => {
      // Create a new token with a non-existent user ID
      const invalidToken = jwt.sign(
        { _id: 'nonexistentid' },
        process.env.JWT_SECRET
      );

      const res = await request(app)
        .delete('/users')
        .set('Authorization', `Bearer ${invalidToken}`);

      expect(res.status).to.equal(500);
      expect(res.body).to.have.property('message');
    });
  });

  describe('PATCH /users/update-password', () => {
    it('should update the password', async () => {
      const res = await request(app)
        .patch('/users/update-password')
        .set('Authorization', `Bearer ${token}`)
        .send({
          oldPassword: 'password123',
          newPassword: 'updatedpassword123',
        });

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('message');

      // Verify the password was updated
      const updatedUser = await User.findById(user._id);
      const isMatch = await bcrypt.compare(
        'updatedpassword123',
        updatedUser.password
      );
      expect(isMatch).to.be.true;
    });

    it('should return 400 for incorrect old password', async () => {
      const res = await request(app)
        .patch('/users/update-password')
        .set('Authorization', `Bearer ${token}`)
        .send({
          oldPassword: 'wrongpassword',
          newPassword: 'updatedpassword123',
        });

      expect(res.status).to.equal(400);
      expect(res.body).to.have.property('error');
    });
  });

  describe('PATCH /users/update-email', () => {
    it('should send email update verification', async () => {
      const res = await request(app)
        .patch('/users/update-email')
        .set('Authorization', `Bearer ${token}`)
        .send({
          newEmail: 'newemail@example.com',
        });

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('message');
      expect(res.body).to.have.property('user');
    });

    it('should return 400 for invalid email', async () => {
      const res = await request(app)
        .patch('/users/update-email')
        .set('Authorization', `Bearer ${token}`)
        .send({
          newEmail: 'invalidemail',
        });

      expect(res.status).to.equal(400);
      expect(res.body).to.have.property('error');
    });
  });
});
