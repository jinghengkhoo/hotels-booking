import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../app.js';
import { User } from '../models/userModel.js';
import jwt from 'jsonwebtoken';

let mongoServer;

describe('User Controller', () => {
  // Set up an in-memory MongoDB server before running tests
  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  // Clean up the database after each test
  afterEach(async () => {
    await User.deleteMany({});
  });

  // Disconnect and stop the in-memory MongoDB server after all tests
  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  describe('POST /api/user/register', () => {
    it('should register a new user', async () => {
      const newUser = {
        email: 'test@example.com',
        password: 'password123',
      };

      const response = await request(app)
        .post('/api/user/register')
        .send(newUser);

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('msg', 'User registered successfully');
      const user = await User.findOne({ email: newUser.email });
      expect(user).toBeTruthy();
    });

    it('should return 400 if user already exists', async () => {
      const existingUser = new User({ email: 'test@example.com', password: 'password123' });
      await existingUser.save();

      const response = await request(app)
        .post('/api/user/register')
        .send({ email: 'test@example.com', password: 'password123' });

      expect(response.statusCode).toBe(400);
      expect(response.body).toHaveProperty('msg', 'User already exists');
    });
  });

  describe('POST /api/user/login', () => {
    it('should login a user with correct credentials', async () => {
      const newUser = {
        email: 'test@example.com',
        password: 'password123',
      };

      await request(app)
        .post('/api/user/register')
        .send(newUser);

      const response = await request(app)
        .post('/api/user/login')
        .send({ email: 'test@example.com', password: 'password123' });

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('msg', 'User logged in successfully');
    });

    it('should return 400 for invalid credentials', async () => {
      const response = await request(app)
        .post('/api/user/login')
        .send({ email: 'invalid@example.com', password: 'invalidpassword' });

      expect(response.statusCode).toBe(400);
      expect(response.body).toHaveProperty('msg', 'Invalid credentials');
    });
  });

  describe('POST /api/user/refresh-token', () => {
    it('should refresh token with a valid refresh token', async () => {
      const user = new User({ email: 'test@example.com', password: 'password123' });
      await user.save();

      const payload = { user: { _id: user._id } };
      const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });

      const response = await request(app)
        .post('/api/user/refresh-token')
        .set('Cookie', [`refreshToken=${refreshToken}`]);

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('msg', 'Token refreshed');
    });

    it('should return 401 for an invalid refresh token', async () => {
      const response = await request(app)
        .post('/api/user/refresh-token')
        .set('Cookie', ['refreshToken=invalidtoken']);

      expect(response.statusCode).toBe(401);
      expect(response.body).toHaveProperty('msg', 'Token is not valid');
    });
  });

  describe('GET /api/user/profile', () => {
    it('should return user profile', async () => {
      const user = new User({ email: 'test@example.com', password: 'password123' });
      await user.save();

      const payload = { user: { _id: user._id } };
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

      const response = await request(app)
        .get('/api/user/profile')
        .set('Cookie', [`token=${token}`]);

      expect(response.statusCode).toBe(200);
      expect(response.body.email).toBe('test@example.com');
    });

    it('should return 404 if user is not found', async () => {
      const payload = { user: { _id: new mongoose.Types.ObjectId() } };
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

      const response = await request(app)
        .get('/api/user/profile')
        .set('Cookie', [`token=${token}`]);

      expect(response.statusCode).toBe(404);
      expect(response.body).toHaveProperty('msg', 'User not found');
    });
  });

  describe('GET /api/user/all', () => {
    it('should return all users', async () => {
      const user1 = new User({ email: 'test1@example.com', password: 'password123' });
      const user2 = new User({ email: 'test2@example.com', password: 'password123' });
      await user1.save();
      await user2.save();

      const response = await request(app).get('/api/user/all');

      expect(response.statusCode).toBe(200);
      expect(response.body.count).toBe(2);
      expect(response.body.data.length).toBe(2);
    });
  });

  describe('PUT /api/user/:id', () => {
    it('should update a user by ID', async () => {
      const user = new User({ email: 'test@example.com', password: 'password123' });
      await user.save();

      const updatedData = { email: 'updated@example.com' };
      const response = await request(app)
        .put(`/api/user/${user._id}`)
        .send(updatedData);

      expect(response.statusCode).toBe(200);
      const updatedUser = await User.findById(user._id);
      expect(updatedUser.email).toBe(updatedData.email);
    });

    it('should return 404 if user is not found', async () => {
      const response = await request(app)
        .put(`/api/user/${new mongoose.Types.ObjectId()}`)
        .send({ email: 'updated@example.com' });

      expect(response.statusCode).toBe(404);
      expect(response.body).toHaveProperty('msg', 'User not found');
    });
  });

  describe('DELETE /api/user/:id', () => {
    it('should delete a user by ID', async () => {
      const user = new User({ email: 'test@example.com', password: 'password123' });
      await user.save();

      const response = await request(app).delete(`/api/user/${user._id}`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('msg', 'User deleted successfully');
      const deletedUser = await User.findById(user._id);
      expect(deletedUser).toBeNull();
    });

    it('should return 404 if user is not found', async () => {
      const response = await request(app).delete(`/api/user/${new mongoose.Types.ObjectId()}`);

      expect(response.statusCode).toBe(404);
      expect(response.body).toHaveProperty('msg', 'User not found');
    });
  });

  describe('POST /api/user/logout', () => {
    it('should log out the user', async () => {
      const response = await request(app).post('/api/user/logout');

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('msg', 'Logged out successfully');
    });
  });
});
