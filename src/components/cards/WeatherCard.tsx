import FavouriteButton from '@/components/forms/FavouriteButton';
import QueryStateWrapper from '@/components/QueryStateWrapper';
import { QueryKeys } from '@/proxies';
import getCurrentWeather from '@/proxies/getCurrentWeather';
import Geolocation from '@/types/Geolocation';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  geolocation?: Geolocation;
  locationId?: number;
}

function LoadingStateDisplay() {
  return (
    <div className="pointer-events-none w-full rounded-2xl border-0.5 border-neutrals-50/30 bg-neutrals-800/20 px-8 py-4 shadow-lg backdrop-blur-xl lg:px-11 lg:py-6">
      <div className="flex animate-pulse items-center justify-between">
        <p className="rounded-full bg-neutrals-50/20 font-display font-bold leading-none text-transparent text-7xl">
          00°
        </p>
        <div className="flex flex-col items-center justify-center gap-y-2">
          <p className="rounded-full bg-neutrals-50/20 font-medium leading-none text-transparent text-sm">
            Clear Sky
          </p>
          <h3 className="rounded-full bg-neutrals-50/20 font-display font-bold leading-none text-transparent text-2xl">
            Hamburg - DE
          </h3>
        </div>
        <div className="h-20 w-20 rounded-full bg-neutrals-50/20 md:h-24 md:w-24 lg:h-32 lg:w-32" />
      </div>
    </div>
  );
}

function WeatherCard({
  geolocation = undefined,
  locationId = undefined,
}: Props) {
  const currentWeatherQuery = useQuery(
    QueryKeys.currentWeather(geolocation || locationId),
    async () => getCurrentWeather({ geolocation, locationId }),
  );

  return (
    <QueryStateWrapper
      query={currentWeatherQuery}
      LoadingStateDisplay={<LoadingStateDisplay />}
      errorText="Unable to fetch weather data. Try again later"
    >
      {(currentWeatherData) => (
        <div className="group relative w-full rounded-2xl border-0.5 border-neutrals-50/30 bg-neutrals-800/60 shadow-lg backdrop-blur-xl transition-all duration-300 focus-visible:-translate-y-1 focus-visible:scale-[1.005] focus-visible:shadow-2xl hover:-translate-y-1 hover:scale-[1.005] hover:shadow-2xl">
          <div className="absolute top-4 right-8 z-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100 lg:top-6 lg:right-11">
            <FavouriteButton locationId={currentWeatherData.id} />
          </div>
          <Link
            href={`/locations/${currentWeatherData.id}`}
            title="View detailed location page"
            className="flex items-center justify-between py-4 px-8 lg:px-11 lg:py-6"
          >
            <p className="font-display font-bold leading-none text-7xl">
              {
                Math.round(
                  currentWeatherData.main.temp,
                ) /* TODO: make this a utility function or smth */
              }
              °
            </p>
            <div className="flex flex-col items-center justify-center gap-y-2">
              <p className="font-medium capitalize leading-none text-neutrals-300 text-sm">
                {currentWeatherData.weather[0].description}
              </p>
              <h3 className="font-display font-bold leading-none text-2xl">
                {currentWeatherData.name} - {currentWeatherData.sys.country}
              </h3>
            </div>
            <div className="h-20 w-20 md:h-24 md:w-24 lg:h-32 lg:w-32">
              <Image
                src={`/images/icons/weather/${currentWeatherData.weather[0].icon}.webp`}
                alt={currentWeatherData.weather[0].description}
                width={256}
                height={256}
                layout="responsive"
              />
            </div>
          </Link>
        </div>
      )}
    </QueryStateWrapper>
  );
}

export default WeatherCard;
