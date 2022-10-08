import { Location } from '@prisma/client';
import axios from 'axios';

async function getFilteredLocations(startsWith: string, limit: number) {
  return axios.get<Location[]>('/api/locations', {
    params: { startsWith, limit },
  });
}

export default getFilteredLocations;
