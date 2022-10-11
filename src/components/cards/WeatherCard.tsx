import QueryStateWrapper from '@/components/QueryStateWrapper';
import { QueryKeys } from '@/proxies';
import getCurrentWeather from '@/proxies/getCurrentWeather';
import Geolocation from '@/types/Geolocation';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';

// const StyledCardWrapper = styled.div`
//   display: flex;
//   width: 100%;
//   justify-content: space-between;
//   align-items: center;
//   padding-inline: 45px;
//   padding-block: 25px;
//   border-radius: 20px;
//   background: ${CommonStyles.colors.card.background};
//   border: ${CommonStyles.colors.card.border};
//   box-shadow: 0 2px 4px rgba(45, 35, 66, 0.35),
//     0 7px 13px -3px rgba(45, 35, 66, 0.25);
//   backdrop-filter: blur(40px);
//   cursor: pointer;
//   transition-property: translate, box-shadow;
//   transition: cubic-bezier(0.215, 0.61, 0.355, 1) 300ms;

//   :hover,
//   :focus-visible {
//     translate: 0 -0.3rem;
//     box-shadow: 0 10px 30px 0 rgba(45, 35, 66, 0.4),
//       0 4px 18px 0 rgba(45, 35, 66, 0.3);
//   }

//   @media only screen and (max-width: 744px) {
//     padding-inline: 25px;
//     padding-block: 15px;
//     border-radius: 13px;
//   }
// `;

// const StyledTemperatureText = styled.p`
//   font-family: 'Roboto Condensed', sans-serif;
//   font-weight: bold;
//   font-size: 4.875rem;
//   line-height: 1;
//   margin: 0;

//   @media only screen and (max-width: 744px) {
//     font-size: 2.5rem;
//   }
// `;

// const StyledDetailsWrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   row-gap: 10px;

//   @media only screen and (max-width: 744px) {
//     row-gap: 6px;
//   }
// `;

// const StyledWeatherText = styled(StyledCaptionLarge)`
//   text-transform: capitalize;
//   color: ${CommonStyles.colors.text2};
// `;

interface Props {
  geolocation?: Geolocation;
  cityId?: number;
}

function WeatherCard({ geolocation = undefined, cityId = undefined }: Props) {
  const currentWeatherQuery = useQuery(
    QueryKeys.currentWeather(geolocation || cityId),
    async () => getCurrentWeather({ geolocation, cityId }),
  );

  return (
    <QueryStateWrapper
      query={currentWeatherQuery}
      errorText="Unable to fetch weather data. Try again later"
    >
      {(currentWeatherData) => (
        <Link
          href={`/locations/${currentWeatherData.id}`}
          passHref
        >
          <a
            className="flex w-full items-center justify-between rounded-2xl border-0.5 border-neutrals-50/30 bg-neutrals-800/60 px-11 py-6 shadow-lg backdrop-blur-xl transition-all duration-300 focus-visible:-translate-y-1 focus-visible:shadow-2xl hover:-translate-y-1 hover:shadow-2xl"
            aria-label="View detailed location page"
          >
            <p className="font-display font-bold leading-none text-8xl">
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
              <h3 className="font-display font-bold leading-none text-3xl">
                {currentWeatherData.name} - {currentWeatherData.sys.country}
              </h3>
            </div>
            <div className="w-20 md:w-28 lg:w-36">
              <Image
                src={`/images/icons/weather/${currentWeatherData.weather[0].icon}.webp`}
                alt={currentWeatherData.weather[0].description}
                width={256}
                height={256}
                layout="responsive"
              />
            </div>
          </a>
        </Link>
      )}
    </QueryStateWrapper>
  );
}

export default WeatherCard;
