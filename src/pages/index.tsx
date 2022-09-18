import styled from 'styled-components';
import WaveBackground from '../components/backgrounds/WaveBackground';
import Layout from '../components/layouts/Layout';
import FavouritesSection from '../components/sections/FavouritesSection';
import GeolocationSection from '../components/sections/GeolocationSection';
import SearchSection from '../components/sections/SearchSection';

const StyledPageWrapper = styled.div`
  position: relative;
  z-index: 1;
`;

function Home() {
  return (
    <Layout title="WeatherWorks | The most visually compelling real-time weather app">
      <WaveBackground />
      <StyledPageWrapper>
        <SearchSection />
        <GeolocationSection />
        <FavouritesSection />
      </StyledPageWrapper>
    </Layout>
  );
}

export default Home;
