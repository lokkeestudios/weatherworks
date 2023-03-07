import Geolocation from '@/types/Geolocation';
import { validateWeatherResponseStatusCode, weatherApi } from '@/utils';

async function getCurrentWeatherByGeolocation(geolocation: Geolocation) {
  return validateWeatherResponseStatusCode(
    weatherApi().getCurrentWeatherByGeolocation(geolocation),
  );
}

export default getCurrentWeatherByGeolocation;
