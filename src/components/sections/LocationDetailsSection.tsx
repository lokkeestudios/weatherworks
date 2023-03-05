import compassNeedleImage from '@/assets/images/compass/needle.webp';
import compassRoseImage from '@/assets/images/compass/rose.webp';
import InformationCard from '@/components/cards/InformationCard';
import WeatherTimepointCard from '@/components/cards/WeatherTimepointCard';
import Container from '@/components/Container';
import FavouriteButton from '@/components/forms/FavouriteButton';
import ArrowLeftIcon from '@/components/icons/ArrowLeftIcon';
import { CurrentWeather, QueryKeys, ThreeHourForecast } from '@/proxies';
import getCurrentWeatherByLocationId from '@/proxies/getCurrentWeatherByLocationId';
import getThreeHourForecast from '@/proxies/getThreeHourForecast';
import WeatherTimepoint from '@/types/Weathertimepoint';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';

function getWeatherTimepoints(
  currentWeatherData: CurrentWeather,
  threeHourForecastData: ThreeHourForecast,
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
    const sunriseDayOffset =
      sunriseDate.getTime() < currentTimepoint.date.getTime() ? 1 : 0;
    const sunsetDayOffset =
      sunsetDate.getTime() < currentTimepoint.date.getTime() ? 1 : 0;

    const currentSunriseDate = new Date(sunriseDate.getTime());
    const currentSunsetDate = new Date(sunsetDate.getTime());
    currentSunriseDate.setUTCDate(
      sunriseDate.getUTCDate() + i + sunriseDayOffset,
    );
    currentSunsetDate.setUTCDate(sunsetDate.getUTCDate() + i + sunsetDayOffset);

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
        rainPropability:
          forecastedWeather.weather[0].main === 'Rain' && forecastedWeather.pop
            ? Math.round(forecastedWeather.pop * 100)
            : undefined,
      }),
    );

  weatherTimepoints.sort((a, b) => a.date.getTime() - b.date.getTime());

  return weatherTimepoints;
}

interface Props {
  initialCurrentWeatherData: CurrentWeather;
  initialThreeHourForecastData: ThreeHourForecast;
}

function LocationDetailsSection({
  initialCurrentWeatherData,
  initialThreeHourForecastData,
}: Props) {
  const locationId = initialCurrentWeatherData.id;

  const currentWeatherQuery = useQuery(
    QueryKeys.currentWeather(locationId),
    async () => getCurrentWeatherByLocationId(locationId),
    {
      initialData: initialCurrentWeatherData,
    },
  );
  const threeHourForecastQuery = useQuery(
    QueryKeys.threeHourForecast(locationId),
    async () => getThreeHourForecast(locationId),
    {
      initialData: initialThreeHourForecastData,
    },
  );

  const isErrorMessageDisplayed =
    currentWeatherQuery.isError || threeHourForecastQuery.isError;
  const isLoaderDisplayed =
    currentWeatherQuery.isLoading || threeHourForecastQuery.isLoading; // TODO: refactor here
  const isWeatherDataAvailable = !isErrorMessageDisplayed && !isLoaderDisplayed;

  function sortWeatherTimepointsByDayTest(
    weatherTimepoints: WeatherTimepoint[],
  ) {
    // Create an object to store the dates by day
    const weatherTimepointsByDay: {
      dayName: string;
      weatherTimepoints: WeatherTimepoint[];
    }[] = [];

    // Loop through the datesArray
    weatherTimepoints.forEach((weatherTimepoint) => {
      // Get the day of the date
      const day = weatherTimepoint.date.getUTCDate();

      // If the day doesn't exist in the object yet, create an empty array for it
      if (!weatherTimepointsByDay[day]) {
        const currentDay = new Date(
          (currentWeatherQuery.data.dt + currentWeatherQuery.data.timezone) *
            1000,
        ).getDate();

        weatherTimepointsByDay[day] = {
          dayName:
            day === currentDay
              ? 'Today'
              : weatherTimepoint.date.toLocaleDateString('en', {
                  weekday: 'long',
                }),
          weatherTimepoints: [],
        };
      }

      // Push the date into the array for its corresponding day
      weatherTimepointsByDay[day].weatherTimepoints.push(weatherTimepoint);
    });

    // Return the datesByDay array
    return weatherTimepointsByDay;
  }

  return (
    <section
      className="relative z-1 py-8"
      aria-label="Location details"
    >
      <Container>
        {isErrorMessageDisplayed && (
          <p>Unable to fetch weather data. Try again later</p>
        )}
        {isWeatherDataAvailable && (
          <>
            <Link
              href="/"
              title="Go back home"
              className="mb-2 inline-block text-neutrals-50/70 transition-colors duration-200 focus-visible:text-neutrals-50 hover:text-neutrals-50"
            >
              <ArrowLeftIcon className="h-7 w-7 lg:h-8 lg:w-8" />
            </Link>
            <div className="mb-10 flex items-center justify-between">
              <h1 className="mb-1 font-display font-bold leading-tight text-5xl">{`${currentWeatherQuery.data.name} - ${currentWeatherQuery.data.sys.country}`}</h1>
              <FavouriteButton locationId={locationId} />
            </div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-3">
              <div className="col-span-3 w-full">
                <InformationCard title="Weather forecast">
                  <ul className="grid auto-cols-max grid-flow-col divide-x-0.5 divide-neutrals-50/30 overflow-x-scroll pb-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-neutrals-300/70 scrollbar-thumb-rounded hover:scrollbar-thumb-neutrals-300/90">
                    {sortWeatherTimepointsByDayTest(
                      getWeatherTimepoints(
                        currentWeatherQuery.data,
                        threeHourForecastQuery.data,
                      ),
                    ).map((weatherTimePointsByDay) => (
                      <div
                        key={weatherTimePointsByDay.dayName}
                        className="px-2 lg:px-4"
                      >
                        <p className="font-display font-bold text-base">
                          {weatherTimePointsByDay.dayName}
                        </p>
                        <ul className="flex gap-x-4 lg:gap-x-8">
                          {weatherTimePointsByDay.weatherTimepoints.map(
                            (weatherTimepoint) => (
                              <WeatherTimepointCard
                                key={weatherTimepoint.date.getTime()}
                                weatherTimepoint={weatherTimepoint}
                              />
                            ),
                          )}
                        </ul>
                      </div>
                    ))}
                  </ul>
                </InformationCard>
              </div>
              <div className="col-span-3 md:col-span-1">
                <InformationCard title="Wind">
                  <div className="relative flex aspect-square items-center justify-center">
                    <Image
                      src={compassRoseImage}
                      alt="Compass rose"
                      fill
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <Image
                      src={compassNeedleImage}
                      alt="Compass needle"
                      fill
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="absolute inset-0"
                    />
                    <div className="absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-neutrals-50/20 backdrop-blur-lg">
                      <span className="font-bold text-base">
                        {currentWeatherQuery.data.wind.speed.toFixed(1)}
                      </span>
                      <span className="text-xs">m/s</span>
                    </div>
                  </div>
                </InformationCard>
              </div>
              <div className="col-span-3 md:col-span-2">
                <InformationCard title="Additional conditions">
                  <div className="flex flex-col gap-y-4 md:flex-row md:justify-between">
                    <div>
                      <p className="font-semibold uppercase text-neutrals-300 text-xs">
                        Visibility
                      </p>
                      <p className="text-base">
                        {currentWeatherQuery.data.visibility} m
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold uppercase text-neutrals-300 text-xs">
                        Humidity
                      </p>
                      <p className="text-base">
                        {currentWeatherQuery.data.main.humidity}%
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold uppercase text-neutrals-300 text-xs">
                        Pressure
                      </p>
                      <p className="text-base">
                        {currentWeatherQuery.data.main.pressure} hPa
                      </p>
                    </div>
                  </div>
                </InformationCard>
              </div>
            </div>
          </>
        )}
      </Container>
    </section>
  );
}

export default LocationDetailsSection;
