import { destinations } from '../config.js';
import Fuse from 'fuse.js';

const fuse = new Fuse(destinations, {
  keys: ['term'],
  includeScore: true,
  threshold: 0.3
});

export const getDestinations = (req, res) => {
  const query = req.query.query;
  if (!query) {
    return res.status(400).json({ message: 'Missing query parameter' });
  }

  const lowerCaseQuery = query.toLowerCase();
  const results = fuse.search(lowerCaseQuery)
    .map(result => result.item)
    .slice(0, 10);
  res.json(results);
};