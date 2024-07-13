import request from 'supertest';
import app from "../app.js"

describe('GET /', () => {
  it('should return Hi', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hi');
  });
});