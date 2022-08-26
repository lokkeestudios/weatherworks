import WaveBackground from '../components/backgrounds/WaveBackground';
import Layout from '../components/layouts/Layout';
import GeolocationSection from '../components/sections/GeolocationSection';
import SearchSection from '../components/sections/SearchSection';

function Home() {
  return (
    <Layout
      title="WeatherWorks | The most visually compelling real-time weather app"
      slug=""
    >
      <WaveBackground />
      <GeolocationSection />
      <SearchSection />
    </Layout>
  );
}

export default Home;
