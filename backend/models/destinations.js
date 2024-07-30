import Fuse from 'fuse.js';
import { destinations } from '../config.js';

const fuse = new Fuse(destinations, {
  keys: ['term'],
  includeScore: true,
  threshold: 0.3
});

export const getDestinationsByName = (query) => {
  const lowerCaseQuery = query.toLowerCase();
  return fuse.search(lowerCaseQuery)
    .map(result => result.item)
    .slice(0, 10);
};