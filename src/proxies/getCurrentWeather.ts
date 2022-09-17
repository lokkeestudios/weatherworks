import { openWeatherMap } from '.';
import Geolocation from '../types/Geolocation';

interface CurrentWeatherParams {
  geolocation?: Geolocation;
  cityId?: number;
}

async function getCurrentWeather({
  geolocation,
  cityId,
}: CurrentWeatherParams) {
  let currentWeatherRes;

  if (geolocation) {
    const { latitude, longitude } = geolocation;

    currentWeatherRes = await openWeatherMap.getCurrentWeatherByGeoCoordinates(
      latitude,
      longitude,
    );
  } else if (cityId) {
    currentWeatherRes = await openWeatherMap.getCurrentWeatherByCityId(cityId);
  } else {
    throw new Error('Either geolocation or cityId must be set');
  }
  return currentWeatherRes;
}

export default getCurrentWeather;
