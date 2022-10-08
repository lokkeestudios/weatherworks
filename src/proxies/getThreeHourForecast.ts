import { validateWeatherResponseStatusCode, weatherApi } from '@/proxies';

async function getThreeHourForecast(cityId: number) {
  return validateWeatherResponseStatusCode(
    weatherApi().getThreeHourForecastByCityId(cityId),
  );
}

export default getThreeHourForecast;
