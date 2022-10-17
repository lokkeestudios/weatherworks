import { Location } from '@prisma/client';
import axios from 'axios';

async function getFilteredLocations(startsWith: string, limit: number) {
  const { data } = await axios.get<Location[]>('/api/locations', {
    params: { startsWith, limit },
  });

  return data;
}

export default getFilteredLocations;
