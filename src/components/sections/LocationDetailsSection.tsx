import Card from '@/components/cards/Card';
import WeatherTimepointCard from '@/components/cards/WeatherTimepointCard';
import FavouriteButton from '@/components/forms/FavouriteButton';
import Loader from '@/components/loaders/Loader';
import Wrapper from '@/components/Wrapper';
import { QueryKeys } from '@/proxies';
import getCurrentWeather from '@/proxies/getCurrentWeather';
import getThreeHourForecast from '@/proxies/getThreeHourForecast';
import WeatherTimepoint from '@/types/Weathertimepoint';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import {
  CurrentResponse,
  ThreeHourResponse,
} from 'openweathermap-ts/dist/types';
import { AiFillHome as HomeIcon } from 'react-icons/ai';
import { BsArrowUp as ArrowUpIcon } from 'react-icons/bs';

function getWeatherTimepoints(
  currentWeatherData: CurrentResponse,
  threeHourForecastData: ThreeHourResponse,
) {
  const weatherTimepoints: WeatherTimepoint[] = [];

  /* TODO: create date utility functions */
  const currentTimepoint: WeatherTimepoint = {
    type: 'current',
    temperature: currentWeatherData.main.temp,
    date: new Date(
      (currentWeatherData.dt + currentWeatherData.timezone) * 1000,
    ),
    icon: currentWeatherData.weather[0].icon,
    description: currentWeatherData.weather[0].description,
  };

  weatherTimepoints.push(currentTimepoint);

  const FORECASTED_DAYS = 3;

  const sunriseDate = new Date(
    (currentWeatherData.sys.sunrise + currentWeatherData.timezone) * 1000,
  );
  const sunsetDate = new Date(
    (currentWeatherData.sys.sunset + currentWeatherData.timezone) * 1000,
  );

  for (let i = 0; i < FORECASTED_DAYS; i++) {
    const dayOffset =
      sunriseDate.getTime() < currentTimepoint.date.getTime() ? 1 : 0;

    const currentSunriseDate = new Date(sunriseDate.getTime());
    const currentSunsetDate = new Date(sunsetDate.getTime());
    currentSunriseDate.setUTCDate(sunriseDate.getUTCDate() + i + dayOffset);
    currentSunsetDate.setUTCDate(sunsetDate.getUTCDate() + i + dayOffset);

    const sunriseTimepoint: WeatherTimepoint = {
      type: 'sunrise',
      date: currentSunriseDate,
      icon: '00d',
      description: 'Sunrise',
    };
    const sunsetTimepoint: WeatherTimepoint = {
      type: 'sunset',
      date: currentSunsetDate,
      icon: '00n',
      description: 'Sunset',
    };
    weatherTimepoints.push(sunriseTimepoint, sunsetTimepoint);
  }

  const MAX_FORECAST_TIMEPOINTS = 8 * FORECASTED_DAYS; // which equals to the next three forecasted days

  threeHourForecastData.list
    .slice(0, MAX_FORECAST_TIMEPOINTS)
    .forEach((forecastedWeather) =>
      weatherTimepoints.push({
        type: 'forecast',
        temperature: forecastedWeather.main.temp,
        date: new Date(
          (forecastedWeather.dt + currentWeatherData.timezone) * 1000,
        ),
        icon: forecastedWeather.weather[0].icon,
        description: forecastedWeather.weather[0].description,
        /* rainPropability:
          forecastedWeather.weather[0].main === 'Rain'
            ? forecastedWeather.pop * 100 // TODO: make custom wrapper type which contains the pop prop
            : undefined, */
      }),
    );

  weatherTimepoints.sort((a, b) => a.date.getTime() - b.date.getTime());

  return weatherTimepoints;
}

interface Props {
  initialCurrentWeatherData: CurrentResponse;
  initialThreeHourForecastData: ThreeHourResponse;
}

function LocationDetailsSection({
  initialCurrentWeatherData,
  initialThreeHourForecastData,
}: Props) {
  const cityId = initialCurrentWeatherData.id;

  const currentWeatherQuery = useQuery(
    QueryKeys.currentWeather(cityId),
    async () => getCurrentWeather({ cityId }),
    {
      initialData: initialCurrentWeatherData,
    },
  );
  const threeHourForecastQuery = useQuery(
    QueryKeys.threeHourForecast(cityId),
    async () => getThreeHourForecast(cityId),
    {
      initialData: initialThreeHourForecastData,
    },
  );

  const isErrorMessageDisplayed =
    currentWeatherQuery.isError || threeHourForecastQuery.isError;
  const isLoaderDisplayed =
    currentWeatherQuery.isLoading || threeHourForecastQuery.isLoading;
  const isWeatherDataAvailable = !isErrorMessageDisplayed && !isLoaderDisplayed;

  return (
    <Wrapper as="section">
      {isErrorMessageDisplayed && (
        <p>Unable to fetch weather data. Try again later</p>
      )}
      {isLoaderDisplayed && <Loader />}
      {isWeatherDataAvailable && (
        <>
          <section className="mb-8">
            <h1 className="font-display text-6xl font-semibold leading-tight">{`${currentWeatherQuery.data.name} - ${currentWeatherQuery.data.sys.country}`}</h1>
            <div className="flex items-center gap-x-2">
              <Link href="/">
                <HomeIcon
                  size={24}
                  className="cursor-pointer focus-visible:text-slate-300 hover:text-slate-300"
                />
              </Link>
              <FavouriteButton cityId={cityId} />
            </div>
          </section>
          <Card title="Weather forecast">
            <ul className="grid w-full auto-cols-max grid-flow-col gap-x-10 overflow-y-hidden overflow-x-scroll scrollbar-none">
              {getWeatherTimepoints(
                currentWeatherQuery.data,
                threeHourForecastQuery.data,
              ).map((weatherTimepoint) => (
                <WeatherTimepointCard
                  key={weatherTimepoint.date.getTime()}
                  weatherTimepoint={weatherTimepoint}
                />
              ))}
            </ul>
          </Card>
          <div className="grid lg:grid-cols-[1fr,_2fr]">
            <Card title="Wind">
              <div className="relative flex aspect-square h-full w-full items-center justify-center rounded-full border-2 border-slate-50">
                <span className="absolute top-1 left-1/2 -translate-x-1/2">
                  N
                </span>
                <span className="absolute right-1 top-1/2 -translate-y-1/2">
                  E
                </span>
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2">
                  S
                </span>
                <span className="absolute left-1 top-1/2 -translate-y-1/2">
                  W
                </span>
                <ArrowUpIcon
                  style={{ rotate: `${-currentWeatherQuery.data.wind.deg}deg` }}
                  size={240}
                />
                <div className="absolute left-1/2 top-1/2 flex aspect-square -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-slate-900 p-2">
                  <span className="text-lg font-bold">
                    {currentWeatherQuery.data.wind.speed}
                  </span>
                  <span className="text-sm">m/s</span>
                </div>
              </div>
            </Card>
            <Card title="[PH] Further stats">
              <div>Visibility: {currentWeatherQuery.data.visibility} m</div>
              <div>Humidity: {currentWeatherQuery.data.main.humidity}%</div>
              <div>Pressure: {currentWeatherQuery.data.main.pressure} hPa</div>
            </Card>
          </div>
        </>
      )}
    </Wrapper>
  );
}

export default LocationDetailsSection;
