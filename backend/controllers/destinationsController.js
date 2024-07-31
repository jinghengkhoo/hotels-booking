import { getDestinationsByName } from "../models/destinations.js";

export const getDestinations = (req, res) => {
  const query = req.query.query;
  if (!query) {
    return res.status(400).json({ message: 'Missing query parameter' });
  }

  if (typeof query !== 'string') {
    return res.status(400).json({ message: 'Query parameter must be a string' });
  }

  const results = getDestinationsByName(query);
  res.json(results);
};