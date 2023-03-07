import Background from '@/components/Background';
import Layout from '@/components/layouts/Layout';
import LocationDetailsSection from '@/components/sections/LocationDetailsSection';
import getCurrentWeatherByLocationId from '@/utils/getCurrentWeatherByLocationId';
import getThreeHourForecast from '@/utils/getThreeHourForecast';
import { GetServerSidePropsContext } from 'next';
import {
  CurrentResponse,
  ThreeHourResponse,
} from 'openweathermap-ts/dist/types';

function isDigit(string: string) {
  const digitsRegex = /^[0-9]*$/;

  return digitsRegex.test(string);
}

async function getServerSideProps(context: GetServerSidePropsContext) {
  const notFound = { notFound: true };

  if (!context.params?.id) {
    return notFound;
  }

  const locationId = context.params.id as string;

  if (!isDigit(locationId)) {
    return notFound;
  }

  const locationIdNum = parseInt(locationId, 10);

  try {
    const [currentWeather, threeHourForecast] = await Promise.all([
      getCurrentWeatherByLocationId(locationIdNum),
      getThreeHourForecast(locationIdNum),
    ]);

    return {
      props: {
        currentWeather,
        threeHourForecast,
      },
    };
  } catch (error) {
    return notFound;
  }
}

interface Props {
  currentWeather: CurrentResponse;
  threeHourForecast: ThreeHourResponse;
}

function Location({ currentWeather, threeHourForecast }: Props) {
  return (
    <Layout
      title={
        `${currentWeather.name} - ${currentWeather.sys.country} | WeatherWorks` /* TODO: extract this into a utility function */
      }
      slug={`location/${currentWeather.id}`}
    >
      <Background src="/images/waves/background2.svg" />
      <LocationDetailsSection
        initialCurrentWeatherData={currentWeather}
        initialThreeHourForecastData={threeHourForecast}
      />
    </Layout>
  );
}

export default Location;

export { getServerSideProps };
