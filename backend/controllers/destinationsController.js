import fs from 'fs'
import { v4 as uuidv4 } from 'uuid';
import Fuse from 'fuse.js';

const loadJSON = (path) => JSON.parse(fs.readFileSync(new URL(path, import.meta.url)));

const destinations = loadJSON('../res/destinations.json').map(destination => ({
  ...destination,
  id: uuidv4() // Add a unique id to each destination
}));

const fuse = new Fuse(destinations, {
  keys: ['term'],
  includeScore: true,
  threshold: 0.3
});

export const getDestinations = (req, res) => {
  const query = req.query.query.toLowerCase();
  const results = fuse.search(query)
    .map(result => result.item)
    .slice(0, 10);
  res.json(results);
};