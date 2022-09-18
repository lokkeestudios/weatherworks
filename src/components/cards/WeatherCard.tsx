import Image from 'next/image';
import Link from 'next/link';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { QueryKeys } from '../../proxies';
import getCurrentWeather from '../../proxies/getCurrentWeather';
import Geolocation from '../../types/Geolocation';
import Loader from '../loaders/Loader';
import ColorStyles from '../styles/ColorStyles';
import {
  StyledBodyLarge,
  StyledCaptionLarge,
  StyledH3,
} from '../styles/TextStyles';

const StyledCardWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding-inline: 45px;
  padding-block: 25px;
  border-radius: 20px;
  background: ${ColorStyles.card.background};
  border: ${ColorStyles.card.border};
  box-shadow: 0 2px 4px rgba(45, 35, 66, 0.35),
    0 7px 13px -3px rgba(45, 35, 66, 0.25);
  backdrop-filter: blur(40px);
  cursor: pointer;
  transition-property: translate, box-shadow;
  transition: cubic-bezier(0.215, 0.61, 0.355, 1) 300ms;

  &:hover {
    translate: 0 -0.3rem;
    box-shadow: 0 10px 30px 0 rgba(45, 35, 66, 0.4),
      0 4px 18px 0 rgba(45, 35, 66, 0.3);
  }

  @media only screen and (max-width: 744px) {
    padding-inline: 25px;
    padding-block: 15px;
    border-radius: 13px;
  }
`;

const StyledTemperatureText = styled.p`
  font-family: 'Roboto Condensed', sans-serif;
  font-weight: bold;
  font-size: 4.875rem;
  line-height: 1;
  margin: 0;

  @media only screen and (max-width: 744px) {
    font-size: 2.5rem;
  }
`;

const StyledDetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 10px;

  @media only screen and (max-width: 744px) {
    row-gap: 6px;
  }
`;

const StyledWeatherText = styled(StyledCaptionLarge)`
  text-transform: capitalize;
  color: ${ColorStyles.text2};
`;

interface Props {
  geolocation?: Geolocation;
  cityId?: number;
}

function WeatherCard({ geolocation = undefined, cityId = undefined }: Props) {
  const {
    data: currentWeatherData,
    isLoading,
    isError,
  } = useQuery(QueryKeys.currentWeather(geolocation || cityId), async () =>
    getCurrentWeather({ geolocation, cityId }),
  );

  if (isError) {
    return (
      <StyledBodyLarge>
        {' '}
        Unable to fetch weather data. Try again later
      </StyledBodyLarge>
    );
  }

  if (isLoading) {
    return <Loader />;
  }

  // PLACEHOLDER ONLY
  if (!currentWeatherData) {
    return <p>TODO</p>;
  }

  return (
    <Link
      href={`/location/${currentWeatherData.id}`}
      aria-label="View detailed location page"
    >
      <StyledCardWrapper>
        <StyledTemperatureText>
          {Math.round(currentWeatherData.main.temp)}°
        </StyledTemperatureText>
        <StyledDetailsWrapper>
          <StyledWeatherText>
            {currentWeatherData.weather[0].description}
          </StyledWeatherText>
          <StyledH3>
            {currentWeatherData.name} - {currentWeatherData.sys.country}
          </StyledH3>
        </StyledDetailsWrapper>
        <Image
          src={`/images/icons/weather/${currentWeatherData.weather[0].icon}.webp`}
          alt={currentWeatherData.weather[0].description}
          width={128}
          height={128}
        />
      </StyledCardWrapper>
    </Link>
  );
}

export default WeatherCard;
