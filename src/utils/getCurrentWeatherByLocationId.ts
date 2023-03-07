import { validateWeatherResponseStatusCode, weatherApi } from '@/utils';

async function getCurrentWeatherByLocationId(locationId: number) {
  return validateWeatherResponseStatusCode(
    weatherApi().getCurrentWeatherByLocationId(locationId),
  );
}

export default getCurrentWeatherByLocationId;
