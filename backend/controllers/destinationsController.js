import { getDestinationsByName } from "../models/destinations";

export const getDestinations = (req, res) => {
  const query = req.query.query;
  if (!query) {
    return res.status(400).json({ message: 'Missing query parameter' });
  }

  const results = getDestinationsByName(query);
  res.json(results);
};