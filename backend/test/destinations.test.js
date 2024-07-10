import request from 'supertest';
import app from '../app.js';

describe('GET /destinations', () => {
  it('should return matching destinations', async () => {
    const response = await request(app).get('/api/destinations').query({ query: 'singapore' });
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeLessThanOrEqual(10);
    response.body.forEach(destination => {
      expect(destination.term.toLowerCase()).toContain('singapore');
    });
  });

  it('should return an empty array for no matches', async () => {
    const response = await request(app).get('/api/destinations').query({ query: 'nonexistentplace' });
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it('should return a 400 error for missing query parameter', async () => {
    const response = await request(app).get('/api/destinations');
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: 'Missing query parameter' });
  });
});
