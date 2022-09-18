import styled from 'styled-components';
import useGeolocation from '../../hooks/useGeolocation';
import WeatherCard from '../cards/WeatherCard';
import Loader from '../loaders/Loader';
import StyledWrapper from '../styles/StyledWrapper';
import { StyledBodyLarge, StyledH2 } from '../styles/TextStyles';

const StyledSectionWrapper = styled(StyledWrapper)`
  display: grid;
  row-gap: 30px;
  padding-block: 35px;

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
    <StyledSectionWrapper as="section">
      <StyledH2>Your location</StyledH2>
      {/* eslint-disable-next-line no-nested-ternary */}
      {error ? (
        <StyledBodyLarge>
          Unable to retrieve location: {error}. Try again later
        </StyledBodyLarge>
      ) : !location ? (
        <Loader />
      ) : (
        <WeatherCard geolocation={location} />
      )}
    </StyledSectionWrapper>
  );
}

export default GeolocationSection;
