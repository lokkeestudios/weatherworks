import Geolocation from '@/types/Geolocation';
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
    getCurrentWeatherByGeolocation: (geolocation: Geolocation) => {
      const { latitude, longitude } = geolocation;

      return openWeatherMap.getCurrentWeatherByGeoCoordinates(
        latitude,
        longitude,
      );
    },
    getCurrentWeatherByLocationId: (locationId: number) =>
      openWeatherMap.getCurrentWeatherByCityId(locationId),
    getThreeHourForecastByLocationId: (locationId: number) =>
      openWeatherMap.getThreeHourForecastByCityId(locationId),
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
  filteredLocations: (id: unknown) => ['filteredLocations', id],
};

export { weatherApi, validateWeatherResponseStatusCode, QueryKeys };
