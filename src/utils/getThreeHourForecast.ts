import { validateWeatherResponseStatusCode, weatherApi } from '@/utils';

async function getThreeHourForecast(locationId: number) {
  return validateWeatherResponseStatusCode(
    weatherApi().getThreeHourForecastByLocationId(locationId),
  );
}

export default getThreeHourForecast;
