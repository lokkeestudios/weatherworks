import { validateWeatherResponseStatusCode, weatherApi } from '@/proxies';

async function getCurrentWeatherByLocationId(locationId: number) {
  return validateWeatherResponseStatusCode(
    weatherApi().getCurrentWeatherByLocationId(locationId),
  );
}

export default getCurrentWeatherByLocationId;
