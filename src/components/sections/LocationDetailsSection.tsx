import compassNeedleImage from '@/assets/images/compass/needle.webp';
import compassRoseImage from '@/assets/images/compass/rose.webp';
import InformationCard from '@/components/cards/InformationCard';
import WeatherTimepointCard from '@/components/cards/WeatherTimepointCard';
import Container from '@/components/Container';
import FavouriteButton from '@/components/forms/FavouriteButton';
import ChevronLeftIcon from '@/components/icons/ChevronLeftIcon';
import { CurrentWeather, QueryKeys, ThreeHourForecast } from '@/utils';
import {
  getWeatherTimepoints,
  sortWeatherTimepointsByDay,
} from '@/utils/dateUtils';
import getCurrentWeatherByLocationId from '@/utils/getCurrentWeatherByLocationId';
import getThreeHourForecast from '@/utils/getThreeHourForecast';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';

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

  const currentDate = new Date(
    (currentWeatherQuery.data.dt + currentWeatherQuery.data.timezone) * 1000,
  );

  const weatherTimepointsByDay = sortWeatherTimepointsByDay(
    currentDate,
    getWeatherTimepoints(currentWeatherQuery.data, threeHourForecastQuery.data),
  );

  const windSpeed = currentWeatherQuery.data.wind.speed.toFixed(1);

  const isErrorMessageDisplayed =
    currentWeatherQuery.isError || threeHourForecastQuery.isError;
  const isLoaderDisplayed =
    currentWeatherQuery.isLoading || threeHourForecastQuery.isLoading;
  const isWeatherDataAvailable = !isErrorMessageDisplayed && !isLoaderDisplayed;

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
              className="mb-2 flex items-center text-neutrals-50/70 transition-colors duration-200 text-base focus-visible:text-neutrals-50 hover:text-neutrals-50"
            >
              <ChevronLeftIcon className="h-7 w-7 lg:h-10 lg:w-10" /> Home
            </Link>
            <div className="mb-10 flex items-center justify-between">
              <h1 className="mb-1 font-display font-bold leading-tight text-5xl">{`${currentWeatherQuery.data.name} - ${currentWeatherQuery.data.sys.country}`}</h1>
              <FavouriteButton locationId={locationId} />
            </div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-3">
              <div className="col-span-3">
                <InformationCard title="Weather forecast">
                  <div className="grid auto-cols-max grid-flow-col divide-x-0.5 divide-neutrals-50/30 overflow-x-scroll pb-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-neutrals-300/70 scrollbar-thumb-rounded hover:scrollbar-thumb-neutrals-300/90">
                    {weatherTimepointsByDay.map((weatherTimePointsByDay) => (
                      <div
                        key={weatherTimePointsByDay.dayOfWeek}
                        className="relative px-2 lg:px-4"
                      >
                        <span className="sticky left-0 font-display font-bold text-base">
                          {weatherTimePointsByDay.dayOfWeek}
                        </span>
                        <ul className="flex flex-1 gap-x-4 lg:gap-x-8">
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
                  </div>
                </InformationCard>
              </div>
              <div className="col-span-3 md:col-span-1">
                <InformationCard title="Wind">
                  <div className="relative flex aspect-square w-full items-center justify-center">
                    <Image
                      src={compassRoseImage}
                      alt="Compass rose"
                      fill
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="absolute h-full w-full"
                    />
                    <Image
                      src={compassNeedleImage}
                      alt="Compass needle"
                      fill
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="absolute h-full w-full"
                    />
                    <div className="flex aspect-square w-32 items-center justify-center rounded-full bg-neutrals-50/20 p-5 backdrop-blur-lg">
                      <div className="text-center">
                        <p className="font-bold text-2xl">{windSpeed}</p>
                        <p className="text-sm">m/s</p>
                      </div>
                    </div>
                  </div>
                </InformationCard>
              </div>
              <div className="col-span-3 md:col-span-2">
                <InformationCard title="Additional conditions">
                  <div className="grid h-full auto-rows-[1fr] grid-cols-2 gap-y-4">
                    <div>
                      <p className="font-semibold uppercase text-neutrals-400 text-xs">
                        Feels like
                      </p>
                      <p className="flex text-5xl">
                        {Math.round(currentWeatherQuery.data.main.feels_like)}°
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold uppercase text-neutrals-400 text-xs">
                        Humidity
                      </p>
                      <p className="text-5xl">
                        {currentWeatherQuery.data.main.humidity}
                        <span className="ml-2 text-base">%</span>
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold uppercase text-neutrals-400 text-xs">
                        Pressure
                      </p>
                      <p className="text-5xl">
                        {currentWeatherQuery.data.main.pressure}
                        <span className="ml-2 text-base">hPa</span>
                      </p>
                    </div>

                    <div>
                      <p className="font-semibold uppercase text-neutrals-400 text-xs">
                        Visibility
                      </p>
                      <p className="text-5xl">
                        {currentWeatherQuery.data.visibility}
                        <span className="ml-2 text-base">m</span>
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
