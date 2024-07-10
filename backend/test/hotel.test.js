import request from 'supertest';
import app from '../app.js';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import NodeCache from 'node-cache';

const mock = new MockAdapter(axios);

jest.mock('node-cache', () => {
  const mNodeCache = {
    get: jest.fn(),
    set: jest.fn(),
  };
  return jest.fn(() => mNodeCache);
});

describe('Hotel Controller', () => {
  let hotelCache;
  let roomCache;

  beforeEach(() => {
    hotelCache = new NodeCache();
    roomCache = new NodeCache();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/hotels/prices', () => {
    it('should return cached data if available', async () => {
      const cachedData = { completed: true, prices: [] };
      hotelCache.get.mockReturnValue(cachedData);

      const response = await request(app).get('/api/hotels/prices').query({
        destination_id: 'dest123',
        checkin: '2024-07-01',
        checkout: '2024-07-04',
        lang: 'en',
        currency: 'SGD',
        country_code: 'SG',
        guests: 2,
        partner_id: 'partner123',
      });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(cachedData);
    });

    it('should fetch data from API and cache it if not available', async () => {
      const apiData = { completed: true, prices: [] };
      hotelCache.get.mockReturnValue(null);
      mock.onGet('https://hotelapi.loyalty.dev/api/hotels/prices').reply(200, apiData);

      const response = await request(app).get('/api/hotels/prices').query({
        destination_id: 'dest123',
        checkin: '2024-07-01',
        checkout: '2024-07-04',
        lang: 'en',
        currency: 'SGD',
        country_code: 'SG',
        guests: 2,
        partner_id: 'partner123',
      });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(apiData);
      expect(hotelCache.set).toHaveBeenCalledWith(
        expect.any(String),
        apiData
      );
    });

    it('should return 500 if there is an error fetching data', async () => {
      hotelCache.get.mockReturnValue(null);
      mock.onGet('https://hotelapi.loyalty.dev/api/hotels/prices').reply(500);

      const response = await request(app).get('/api/hotels/prices').query({
        destination_id: 'dest123',
        checkin: '2024-07-01',
        checkout: '2024-07-04',
        lang: 'en',
        currency: 'SGD',
        country_code: 'SG',
        guests: 2,
        partner_id: 'partner123',
      });

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'Failed to fetch prices data' });
    });
  });

  describe('GET /api/hotels/:id', () => {
    it('should return cached data if available', async () => {
      const cachedData = { id: 'hotel123', name: 'Test Hotel' };
      hotelCache.get.mockReturnValue(cachedData);

      const response = await request(app).get('/api/hotels/hotel123');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(cachedData);
    });

    it('should fetch data from API and cache it if not available', async () => {
      const apiData = { id: 'hotel123', name: 'Test Hotel' };
      hotelCache.get.mockReturnValue(null);
      mock.onGet('https://hotelapi.loyalty.dev/api/hotels/hotel123').reply(200, apiData);

      const response = await request(app).get('/api/hotels/hotel123');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(apiData);
      expect(hotelCache.set).toHaveBeenCalledWith('hotel123', apiData);
    });

    it('should return 500 if there is an error fetching data', async () => {
      hotelCache.get.mockReturnValue(null);
      mock.onGet('https://hotelapi.loyalty.dev/api/hotels/hotel123').reply(500);

      const response = await request(app).get('/api/hotels/hotel123');

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'Failed to fetch hotel data' });
    });
  });

  describe('GET /api/hotels/:id/rooms', () => {
    it('should return cached data if available', async () => {
      const cachedData = { completed: true, rooms: [] };
      roomCache.get.mockReturnValue(cachedData);

      const response = await request(app).get('/api/hotels/hotel123/price').query({
        destination_id: 'dest123',
        checkin: '2024-07-01',
        checkout: '2024-07-04',
        lang: 'en',
        currency: 'SGD',
        country_code: 'SG',
        guests: 2,
        partner_id: 'partner123',
      });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(cachedData);
    });

    it('should fetch data from API and cache it if not available', async () => {
      const apiData = { completed: true, rooms: [] };
      roomCache.get.mockReturnValue(null);
      mock.onGet('https://hotelapi.loyalty.dev/api/hotels/hotel123/price').reply(200, apiData);

      const response = await request(app).get('/api/hotels/hotel123/price').query({
        destination_id: 'dest123',
        checkin: '2024-07-01',
        checkout: '2024-07-04',
        lang: 'en',
        currency: 'SGD',
        country_code: 'SG',
        guests: 2,
        partner_id: 'partner123',
      });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(apiData);
      expect(roomCache.set).toHaveBeenCalledWith(
        expect.any(String),
        apiData
      );
    });

    it('should return 500 if there is an error fetching data', async () => {
      roomCache.get.mockReturnValue(null);
      mock.onGet('https://hotelapi.loyalty.dev/api/hotels/hotel123/price').reply(500);

      const response = await request(app).get('/api/hotels/hotel123/price').query({
        destination_id: 'dest123',
        checkin: '2024-07-01',
        checkout: '2024-07-04',
        lang: 'en',
        currency: 'SGD',
        country_code: 'SG',
        guests: 2,
        partner_id: 'partner123',
      });

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'Failed to fetch prices data' });
    });
  });
});
