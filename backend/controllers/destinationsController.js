import fs from 'fs'
import { v4 as uuidv4 } from 'uuid';


const loadJSON = (path) => JSON.parse(fs.readFileSync(new URL(path, import.meta.url)));

const destinations = loadJSON('../res/destinations.json').map(destination => ({
  ...destination,
  id: uuidv4() // Add a unique id to each destination
}));

export const getDestinations = (req, res) => {
  const query = req.query.query.toLowerCase();
  const results = destinations.filter((dest) =>
    dest.term && dest.term.toLowerCase().includes(query)
  )
    .sort((a, b) => a.term.toLowerCase().indexOf(query) - b.term.toLowerCase().indexOf(query))
    .slice(0, 10);
  res.json(results);
}