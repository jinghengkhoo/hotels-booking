import axios from "axios";
import fs from 'fs';
import NodeCache from 'node-cache';

const hotelCache = new NodeCache({ stdTTL: 3600, checkperiod: 120 });
const roomCache = new NodeCache({ stdTTL: 3600, checkperiod: 120 });

export const prices = async (req, res) => {
  try {
    const {
      destination_id, checkin, checkout, lang,
      currency, country_code, guests, partner_id
    } = req.query;

    const cacheKey = `${destination_id}_${checkin}_${checkout}_${lang}_${currency}_${country_code}_${guests}_${partner_id}`;

    const cachedData = hotelCache.get(cacheKey);
    if (cachedData) {
      return res.json(cachedData);
    } else {
      const response = await axios.get('https://hotelapi.loyalty.dev/api/hotels/prices', {
        params: {
          destination_id: req.query.destination_id,
          checkin: req.query.checkin,
          checkout: req.query.checkout,
          lang: req.query.lang,
          currency: req.query.currency,
          country_code: req.query.country_code,
          guests: req.query.guests,
          partner_id: req.query.partner_id,
        },
      });

      if (response.data.completed) {
        hotelCache.set(cacheKey, response.data);
      }

      return res.json(response.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to fetch prices data' });
  }
};

export const getHotel = async (req, res) => {
  try {
    const { id } = req.params;
    const cachedData = hotelCache.get(id);
    if (cachedData) {
      res.json(cachedData);
    } else {
      const response = await axios.get(`https://hotelapi.loyalty.dev/api/hotels/${id}`);
      hotelCache.set(id, response.data);
      res.json(response.data);
    }

  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Failed to fetch hotel data' });
  }
};

export const getRooms = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      destination_id, checkin, checkout, lang,
      currency, country_code, guests, partner_id
    } = req.query;

    const cacheKey = `${id}_${destination_id}_${checkin}_${checkout}_${lang}_${currency}_${country_code}_${guests}_${partner_id}`;
    const cachedData = roomCache.get(cacheKey);
    if (cachedData) {
      return res.json(cachedData);
    } else {
      const response = await axios.get(`https://hotelapi.loyalty.dev/api/hotels/${id}/price`, {
        params: {
          destination_id: req.query.destination_id,
          checkin: req.query.checkin,
          checkout: req.query.checkout,
          lang: req.query.lang,
          currency: req.query.currency,
          country_code: req.query.country_code,
          guests: req.query.guests,
          partner_id: req.query.partner_id,
        },
      });
      
      if (response.data.completed) {
        roomCache.set(cacheKey, response.data);
      }

      return res.json(response.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to fetch prices data' });
  }
};