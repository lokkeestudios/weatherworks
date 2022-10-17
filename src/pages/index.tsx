import Background from '@/components/Background';
import Layout from '@/components/layouts/Layout';
import FavouritesSection from '@/components/sections/FavouritesSection';
import GeolocationSection from '@/components/sections/GeolocationSection';
import SearchSection from '@/components/sections/SearchSection';
import getIpInformation from '@/proxies/getIpInformation';
import Geolocation from '@/types/Geolocation';
import { GetServerSidePropsContext } from 'next';

const LOCAL_IP_LIST = ['::1', '127.0.0.1', 'localhost'];

async function getServerSideProps({ req }: GetServerSidePropsContext) {
  const forwarded = req.headers['x-forwarded-for'] as string | undefined;
  const ip = forwarded ? forwarded.split(',')[0] : req.socket.remoteAddress;

  if (!ip || LOCAL_IP_LIST.includes(ip)) {
    return { props: {} };
  }
  try {
    const ipInformation = await getIpInformation(ip);
    const { lat, lon } = ipInformation.data;

    return {
      props: {
        geolocation: {
          latitude: lat,
          longitude: lon,
        },
      },
    };
  } catch (error) {
    return { props: {} };
  }
}

interface Props {
  geolocation: Geolocation | undefined;
}

function Home({ geolocation }: Props) {
  return (
    <Layout title="WeatherWorks | The most visually compelling real-time weather app">
      <Background src="/images/waves/background1.svg" />
      <SearchSection />
      <GeolocationSection geolocation={geolocation} />
      <FavouritesSection />
    </Layout>
  );
}

export default Home;

export { getServerSideProps };
