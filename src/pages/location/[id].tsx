import WaveBackground2 from '@/components/backgrounds/WaveBackground2';
import Layout from '@/components/layouts/Layout';
import LocationDetailsSection from '@/components/sections/LocationDetailsSection';
import getCurrentWeather from '@/proxies/getCurrentWeather';
import getThreeHourForecast from '@/proxies/getThreeHourForecast';
import { GetServerSidePropsContext } from 'next';
import {
  CurrentResponse,
  ThreeHourResponse,
} from 'openweathermap-ts/dist/types';

/* start utility function */
function isDigit(string: string) {
  const digitsRegex = /^[0-9]*$/;

  return digitsRegex.test(string);
}
/* end utility function */

async function getServerSideProps(context: GetServerSidePropsContext) {
  const notFound = { notFound: true };

  if (!context.params?.id) {
    return notFound;
  }

  const cityId = context.params.id as string;

  if (!isDigit(cityId)) {
    return notFound;
  }

  const cityIdNum = parseInt(cityId, 10);

  try {
    const [currentWeather, threeHourForecast] = await Promise.all([
      getCurrentWeather({ cityId: cityIdNum }),
      getThreeHourForecast(cityIdNum),
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
      title={`[PH] ${currentWeather.name} - ${currentWeather.sys.country} | WeatherWorks`}
      slug={`location/${currentWeather.id}`}
    >
      <WaveBackground2 />
      <LocationDetailsSection
        initialCurrentWeatherData={currentWeather}
        initialThreeHourForecastData={threeHourForecast}
      />
    </Layout>
  );
}

export default Location;

export { getServerSideProps };
