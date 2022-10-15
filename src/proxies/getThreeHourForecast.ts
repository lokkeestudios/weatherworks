import { validateWeatherResponseStatusCode, weatherApi } from '@/proxies';

async function getThreeHourForecast(locationId: number) {
  return validateWeatherResponseStatusCode(
    weatherApi().getThreeHourForecastByLocationId(locationId),
  );
}

export default getThreeHourForecast;
