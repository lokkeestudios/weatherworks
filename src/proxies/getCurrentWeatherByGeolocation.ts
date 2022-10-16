import { validateWeatherResponseStatusCode, weatherApi } from '@/proxies';
import Geolocation from '@/types/Geolocation';

async function getCurrentWeatherByGeolocation(geolocation: Geolocation) {
  return validateWeatherResponseStatusCode(
    weatherApi().getCurrentWeatherByGeolocation(geolocation),
  );
}

export default getCurrentWeatherByGeolocation;
