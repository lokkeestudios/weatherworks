import OpenWeatherMap from 'openweathermap-ts';

const { NEXT_PUBLIC_WEATHER_API_KEY } = process.env;

if (NEXT_PUBLIC_WEATHER_API_KEY === undefined) {
  throw new Error('.env variable WEATHER_API_KEY is undefined');
}

const openWeatherMap = new OpenWeatherMap({
  apiKey: NEXT_PUBLIC_WEATHER_API_KEY,
  units: 'metric',
});

const QueryKeys = {
  currentWeather: (id: unknown) => ['currentWeather', id],
  threeHourForecast: (id: unknown) => ['threeHourForecast', id],
};

export { openWeatherMap, QueryKeys };
