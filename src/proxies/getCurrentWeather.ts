import { validateWeatherResponseStatusCode, weatherApi } from '@/proxies';
import Geolocation from '@/types/Geolocation';

interface CurrentWeatherParams {
  geolocation?: Geolocation;
  locationId?: number;
}

async function getCurrentWeather({
  geolocation,
  locationId,
}: CurrentWeatherParams) {
  let currentWeatherRes;

  if (geolocation) {
    const { latitude, longitude } = geolocation;

    currentWeatherRes = weatherApi().getCurrentWeatherByGeoCoordinates(
      latitude,
      longitude,
    );
  } else if (locationId) {
    currentWeatherRes = weatherApi().getCurrentWeatherByLocationId(locationId);
  } else {
    throw new Error('Either geolocation or locationId must be set');
  }
  return validateWeatherResponseStatusCode(currentWeatherRes);
}

export default getCurrentWeather;
