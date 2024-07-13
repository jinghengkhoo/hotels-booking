import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const loadJSON = (filePath) => {
  const absolutePath = path.resolve(process.cwd(), filePath);
  return JSON.parse(fs.readFileSync(absolutePath, 'utf8'));
};

export const destinations = loadJSON('./res/destinations.json').map(destination => ({
  ...destination,
  id: uuidv4() // Add a unique id to each destination
}));