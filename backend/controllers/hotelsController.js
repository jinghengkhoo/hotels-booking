import axios from "axios";
import fs from 'fs';
import NodeCache from 'node-cache';

const hotelCache = new NodeCache({ stdTTL: 3600, checkperiod: 120 });

export const prices = async (req, res) => {
  try {
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

    // Save the response data to a JSON file
    fs.writeFile('temp/prices.json', JSON.stringify(response.data, null, 2), (err) => {
      if (err) {
        console.error('Error writing to file', err);
        res.status(500).json({ error: 'Failed to save prices data' });
      } else {
        console.log('Response data saved to prices.json');
      }
    });

    res.json(response.data);

  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Failed to fetch prices data' });
  }
};

export const getHotel = async (req, res) => {
  try {
    const { id } = req.params;
    const cachedData = hotelCache.get(id);
    if (cachedData) {
      console.log('cache hit')
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

    res.json(response.data);

  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Failed to fetch prices data' });
  }
};