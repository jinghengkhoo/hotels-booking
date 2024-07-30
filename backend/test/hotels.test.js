import request from 'supertest';
import app from '../app.js';
import { fetchPrices, fetchHotel, fetchRooms } from '../apiControllers/hotelsApiController';

jest.mock('../apiControllers/hotelsApiController');

describe('Hotel Controller Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('prices', () => {
    it('should return prices data', async () => {
      const mockData = { completed: true, prices: [] };
      fetchPrices.mockResolvedValue(mockData);

      const response = await request(app).get('/api/hotels/prices').query({ destination_id: 1 });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockData);
      expect(fetchPrices).toHaveBeenCalledWith({ destination_id: "1" });
    });

    it('should handle errors', async () => {
      fetchPrices.mockRejectedValue(new Error('Failed to fetch'));

      const response = await request(app).get('/api/hotels/prices').query({ destination_id: 1 });

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'Failed to fetch prices data' });
    });
  });

  describe('getHotel', () => {
    it('should return hotel data', async () => {
      const mockData = { id: 'hotel123', name: 'Test Hotel' };
      fetchHotel.mockResolvedValue(mockData);

      const response = await request(app).get('/api/hotels/hotel123');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockData);
      expect(fetchHotel).toHaveBeenCalledWith("hotel123");
    });

    it('should handle errors', async () => {
      fetchHotel.mockRejectedValue(new Error('Failed to fetch'));

      const response = await request(app).get('/api/hotels/hotel123');

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'Failed to fetch hotel data' });
    });
  });

  describe('getRooms', () => {
    it('should return rooms data', async () => {
      const mockData = { completed: true, rooms: [] };
      fetchRooms.mockResolvedValue(mockData);

      const response = await request(app).get('/api/hotels/hotel123/price').query({ checkin: '2024-08-01' });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockData);
      expect(fetchRooms).toHaveBeenCalledWith("hotel123", { checkin: "2024-08-01" });
    });

    it('should handle errors', async () => {
      fetchRooms.mockRejectedValue(new Error('Failed to fetch'));

      const response = await request(app).get('/api/hotels/hotel123/price').query({ checkin: '2024-08-01' });

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'Failed to fetch rooms data' });
    });
  });
});
