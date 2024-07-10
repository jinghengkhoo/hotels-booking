import request from 'supertest';
import app from "../app.js"
import dotenv from 'dotenv';

dotenv.config();

describe('POST /api/admin/login', () => {
    it('should return 200 and a success message for correct credentials', async () => {
      const res = await request(app)
        .post('/api/admin/login')
        .send({
          username: process.env.ADMIN_USERNAME,
          password: process.env.ADMIN_PASSWORD,
        });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('msg', 'Admin logged in successfully');
    });
  
    it('should return 401 and an error message for incorrect username', async () => {
      const res = await request(app)
        .post('/api/admin/login')
        .send({
          username: 'wrongUsername',
          password: process.env.ADMIN_PASSWORD,
        });
      expect(res.statusCode).toEqual(401);
      expect(res.body).toHaveProperty('msg', 'Invalid username or password');
    });
  
    it('should return 401 and an error message for incorrect password', async () => {
      const res = await request(app)
        .post('/api/admin/login')
        .send({
          username: process.env.ADMIN_USERNAME,
          password: 'wrongPassword',
        });
      expect(res.statusCode).toEqual(401);
      expect(res.body).toHaveProperty('msg', 'Invalid username or password');
    });
  });