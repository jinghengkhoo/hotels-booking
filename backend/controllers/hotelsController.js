import { fetchPrices, fetchHotel, fetchRooms } from '../apiControllers/hotelsApiController.js';

export const prices = async (req, res) => {
  try {
    const data = await fetchPrices(req.query);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch prices data' });
  }
};

export const getHotel = async (req, res) => {
  try {
    const data = await fetchHotel(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch hotel data' });
  }
};

export const getRooms = async (req, res) => {
  try {
    const data = await fetchRooms(req.params.id, req.query);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch rooms data' });
  }
};