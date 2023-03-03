import Geolocation from '@/types/Geolocation';
import OpenWeatherMap from 'openweathermap-ts';
import {
  CurrentResponse,
  ThreeHourResponse,
} from 'openweathermap-ts/dist/types';

const WEATHER_API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

if (WEATHER_API_KEY === undefined) {
  throw new Error('.env variable WEATHER_API_KEY is undefined');
}

const openWeatherMap = new OpenWeatherMap({
  apiKey: WEATHER_API_KEY,
  units: 'metric',
});

type CurrentWeather = CurrentResponse;

type ThreeHourForecast = {
  list: ({ pop?: number } & ThreeHourResponse['list'][number])[];
} & ThreeHourResponse;

function weatherApi() {
  return {
    getCurrentWeatherByGeolocation: (
      geolocation: Geolocation,
    ): Promise<CurrentWeather> => {
      const { latitude, longitude } = geolocation;

      return openWeatherMap.getCurrentWeatherByGeoCoordinates(
        latitude,
        longitude,
      );
    },
    getCurrentWeatherByLocationId: (locationId: number) =>
      openWeatherMap.getCurrentWeatherByCityId(locationId),
    getThreeHourForecastByLocationId: (locationId: number) =>
      openWeatherMap.getThreeHourForecastByCityId(
        locationId,
      ) as Promise<ThreeHourForecast>,
  };
}

async function validateWeatherResponseStatusCode<
  T extends Promise<CurrentWeather> | Promise<ThreeHourForecast>,
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
  filteredLocations: (id: unknown) => ['filteredLocations', id],
};

export {
  type CurrentWeather,
  type ThreeHourForecast,
  weatherApi,
  validateWeatherResponseStatusCode,
  QueryKeys,
};
