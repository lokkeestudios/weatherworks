import OpenWeatherMap from 'openweathermap-ts';
import {
  CurrentResponse,
  ThreeHourResponse,
} from 'openweathermap-ts/dist/types';

const { NEXT_PUBLIC_WEATHER_API_KEY } = process.env;

if (NEXT_PUBLIC_WEATHER_API_KEY === undefined) {
  throw new Error('.env variable WEATHER_API_KEY is undefined');
}

const openWeatherMap = new OpenWeatherMap({
  apiKey: NEXT_PUBLIC_WEATHER_API_KEY,
  units: 'metric',
});

function weatherApi() {
  return {
    getCurrentWeatherByGeoCoordinates: (latitude: number, longitude: number) =>
      openWeatherMap.getCurrentWeatherByGeoCoordinates(latitude, longitude),
    getCurrentWeatherByCityId: (cityId: number) =>
      openWeatherMap.getCurrentWeatherByCityId(cityId),
    getThreeHourForecastByCityId: (cityId: number) =>
      openWeatherMap.getThreeHourForecastByCityId(cityId),
  };
}

async function validateWeatherResponseStatusCode<
  T extends Promise<CurrentResponse> | Promise<ThreeHourResponse>,
>(weatherResponse: T): Promise<T> {
  const response = await weatherResponse;

  if (!response.cod.toString().startsWith('20')) {
    throw new Error('Failed to fetch weather data');
  }
  return response;
}

const QueryKeys = {
  currentWeather: (id: unknown) => ['currentWeather', id],
  threeHourForecast: (id: unknown) => ['threeHourForecast', id],
};

export { weatherApi, validateWeatherResponseStatusCode, QueryKeys };
