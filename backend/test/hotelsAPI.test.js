import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import NodeCache from 'node-cache';
import { fetchPrices, fetchHotel, fetchRooms } from '../apiControllers/hotelsApiController.js';

const mock = new MockAdapter(axios);

const hotelCache = new NodeCache();
const roomCache = new NodeCache();

jest.mock('node-cache', () => {
  return jest.fn().mockImplementation(() => {
    return {
      get: jest.fn(),
      set: jest.fn(),
      flushAll: jest.fn()
    };
  });
});

describe('fetchPrices', () => {
  beforeEach(() => {
    hotelCache.flushAll.mockClear();
    roomCache.flushAll.mockClear();
  });

  it('should fetch data from API if not cached', async () => {
    const params = { destination_id: 1, checkin: '2024-08-01', checkout: '2024-08-10', lang: 'en', currency: 'USD', country_code: 'US', guests: 2, partner_id: 'partner123' };
    const apiResponse = { completed: true, prices: [] };

    hotelCache.get.mockReturnValue(null);
    mock.onGet('https://hotelapi.loyalty.dev/api/hotels/prices').reply(200, apiResponse);

    const result = await fetchPrices(params);
    expect(result).toEqual(apiResponse);
  });

  it('should throw an error if API request fails', async () => {
    const params = { destination_id: 1, checkin: '2024-08-01', checkout: '2024-08-10', lang: 'en', currency: 'USD', country_code: 'US', guests: 2, partner_id: 'partner123' };

    hotelCache.get.mockReturnValue(null);
    mock.onGet('https://hotelapi.loyalty.dev/api/hotels/prices').reply(500);

    await expect(fetchPrices(params)).rejects.toThrow('API Error: Request failed with status code 500');
  });
});

describe('fetchHotel', () => {
  beforeEach(() => {
    hotelCache.flushAll.mockClear();
    roomCache.flushAll.mockClear();
  });

  it('should fetch data from API if not cached', async () => {
    const id = 'hotel123';
    const apiResponse = { id, name: 'Test Hotel' };

    hotelCache.get.mockReturnValue(null);
    mock.onGet(`https://hotelapi.loyalty.dev/api/hotels/${id}`).reply(200, apiResponse);

    const result = await fetchHotel(id);
    expect(result).toEqual(apiResponse);
  });

  it('should throw an error if API request fails', async () => {
    const id = 'hotel123';

    hotelCache.get.mockReturnValue(null);
    mock.onGet(`https://hotelapi.loyalty.dev/api/hotels/${id}`).reply(500);

    await expect(fetchHotel(id)).rejects.toThrow('API Error: Request failed with status code 500');
  });
});

describe('fetchRooms', () => {
  beforeEach(() => {
    hotelCache.flushAll.mockClear();
    roomCache.flushAll.mockClear();
  });

  it('should fetch data from API if not cached', async () => {
    const id = 'hotel123';
    const params = { destination_id: 1, checkin: '2024-08-01', checkout: '2024-08-10', lang: 'en', currency: 'USD', country_code: 'US', guests: 2, partner_id: 'partner123' };
    const apiResponse = { completed: true, rooms: [] };

    roomCache.get.mockReturnValue(null);
    mock.onGet(`https://hotelapi.loyalty.dev/api/hotels/${id}/price`).reply(200, apiResponse);

    const result = await fetchRooms(id, params);
    expect(result).toEqual(apiResponse);
  });

  it('should throw an error if API request fails', async () => {
    const id = 'hotel123';
    const params = { destination_id: 1, checkin: '2024-08-01', checkout: '2024-08-10', lang: 'en', currency: 'USD', country_code: 'US', guests: 2, partner_id: 'partner123' };

    roomCache.get.mockReturnValue(null);
    mock.onGet(`https://hotelapi.loyalty.dev/api/hotels/${id}/price`).reply(500);

    await expect(fetchRooms(id, params)).rejects.toThrow('API Error: Request failed with status code 500');
  });
});
