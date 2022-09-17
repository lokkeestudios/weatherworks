import { openWeatherMap } from '.';

async function getThreeHourForecast(cityId: number) {
  const threeHourForecastRes =
    await openWeatherMap.getThreeHourForecastByCityId(cityId);

  return threeHourForecastRes;
}

export default getThreeHourForecast;
