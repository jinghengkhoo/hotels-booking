import axios from "axios";
import NodeCache from 'node-cache';

const hotelCache = new NodeCache({ stdTTL: 3600, checkperiod: 120 });
const roomCache = new NodeCache({ stdTTL: 3600, checkperiod: 120 });

export const fetchPrices = async (params) => {
  const {
    destination_id, checkin, checkout, lang,
    currency, country_code, guests, partner_id
  } = params;

  const cacheKey = `${destination_id}_${checkin}_${checkout}_${lang}_${currency}_${country_code}_${guests}_${partner_id}`;

  const cachedData = hotelCache.get(cacheKey);
  if (cachedData) {
    return cachedData;
  } else {
    try {
      const response = await axios.get('https://hotelapi.loyalty.dev/api/hotels/prices', { params });

      console.log(response)

      if (response.data && response.data.completed) {
        hotelCache.set(cacheKey, response.data);
      }

      return response.data;
    } catch (error) {
      throw new Error(`API Error: ${error.message}`);
    }
  }
};

export const fetchHotel = async (id) => {
  const cachedData = hotelCache.get(id);
  if (cachedData) {
    return cachedData;
  } else {
    try {
      const response = await axios.get(`https://hotelapi.loyalty.dev/api/hotels/${id}`);
      if (response.data) {
        hotelCache.set(id, response.data);
      }
      return response.data;
    } catch (error) {
      throw new Error(`API Error: ${error.message}`);
    }
  }
};

export const fetchRooms = async (id, params) => {
  const {
    destination_id, checkin, checkout, lang,
    currency, country_code, guests, partner_id
  } = params;

  const cacheKey = `${id}_${destination_id}_${checkin}_${checkout}_${lang}_${currency}_${country_code}_${guests}_${partner_id}`;
  const cachedData = roomCache.get(cacheKey);
  if (cachedData) {
    return cachedData;
  } else {
    try {
      const response = await axios.get(`https://hotelapi.loyalty.dev/api/hotels/${id}/price`, { params });

      if (response.data && response.data.completed) {
        roomCache.set(cacheKey, response.data);
      }

      return response.data;
    } catch (error) {
      throw new Error(`API Error: ${error.message}`);
    }
  }
};
