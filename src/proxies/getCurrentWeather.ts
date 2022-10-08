import { validateWeatherResponseStatusCode, weatherApi } from '@/proxies';
import Geolocation from '@/types/Geolocation';

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

    currentWeatherRes = weatherApi().getCurrentWeatherByGeoCoordinates(
      latitude,
      longitude,
    );
  } else if (cityId) {
    currentWeatherRes = weatherApi().getCurrentWeatherByCityId(cityId);
  } else {
    throw new Error('Either geolocation or cityId must be set');
  }
  return validateWeatherResponseStatusCode(currentWeatherRes);
}

export default getCurrentWeather;
