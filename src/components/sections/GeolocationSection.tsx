import styled from 'styled-components';
import useGeolocation from '../../hooks/useGeolocation';
import WeatherCard from '../cards/WeatherCard';
import { BodyLarge, H2 } from '../styles/TextStyles';
import Wrapper from '../styles/Wrapper';

const SectionWrapper = styled(Wrapper)`
  display: grid;
  row-gap: 30px;
  padding-block: 25px;

  @media only screen and (max-width: 744px) {
    row-gap: 20px;
  }
`;

function GeolocationSection() {
  const [location, error] = useGeolocation({
    maximumAge: 1000,
    timeout: 1000 * 10,
  });

  return (
    <SectionWrapper as="section">
      <H2>Your location</H2>
      {/* eslint-disable-next-line no-nested-ternary */}
      {error ? (
        <BodyLarge>Unable to retrieve location: {error}</BodyLarge>
      ) : location ? (
        <WeatherCard location={location} />
      ) : (
        <BodyLarge>Locating...</BodyLarge>
      )}
    </SectionWrapper>
  );
}

export default GeolocationSection;
