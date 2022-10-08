import WaveBackground1 from '@/components/backgrounds/WaveBackground1';
import Layout from '@/components/layouts/Layout';
import FavouritesSection from '@/components/sections/FavouritesSection';
import GeolocationSection from '@/components/sections/GeolocationSection';
import SearchSection from '@/components/sections/SearchSection';

function Home() {
  return (
    <Layout title="WeatherWorks | The most visually compelling real-time weather app">
      <WaveBackground1 />
      <SearchSection />
      <GeolocationSection />
      <FavouritesSection />
    </Layout>
  );
}

export default Home;
