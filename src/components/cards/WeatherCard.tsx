import Link from 'next/link';
import OpenWeatherMap from 'openweathermap-ts';
import { CurrentResponse } from 'openweathermap-ts/dist/types';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import ColorStyles from '../styles/ColorStyles';
import { BodyLarge, CaptionLarge, H3 } from '../styles/TextStyles';

const CardWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding-inline: 45px;
  padding-block: 25px;
  border-radius: 20px;
  background: ${ColorStyles.dark.card.background};
  border: 0.5px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0px 25px 80px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(40px);
  cursor: pointer;

  @media only screen and (max-width: 744px) {
    padding-inline: 25px;
    padding-block: 15px;
    border-radius: 13px;
  }
`;

const TemperatureText = styled.p`
  font-family: 'Roboto Condensed', sans-serif;
  font-weight: bold;
  font-size: 4.875rem;
  line-height: 1;
  margin: 0;

  @media only screen and (max-width: 744px) {
    font-size: 2.5rem;
  }
`;

const DetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 10px;

  @media only screen and (max-width: 744px) {
    row-gap: 6px;
  }
`;

const WeatherText = styled(CaptionLarge)`
  text-transform: capitalize;
  color: ${ColorStyles.dark.text2};
`;

const WeatherIcon = styled.img`
  width: 128px;

  @media only screen and (max-width: 744px) {
    width: 60px;
  }
`;

interface Props {
  latitude: number;
  longitude: number;
}

function WeatherCard({ latitude, longitude }: Props) {
  const [weatherData, setWeatherData] = useState<CurrentResponse>();
  const [isFailed, setIsFailed] = useState(false);

  useEffect(() => {
    const { NEXT_PUBLIC_WEATHER_API_KEY } = process.env;

    if (NEXT_PUBLIC_WEATHER_API_KEY === undefined) {
      throw new Error('.env.local variable WEATHER_API_KEY is undefined');
    }

    const openWeather = new OpenWeatherMap({
      apiKey: NEXT_PUBLIC_WEATHER_API_KEY,
      units: 'metric',
    });

    openWeather
      .getCurrentWeatherByGeoCoordinates(latitude, longitude)
      .then((data) => setWeatherData(data))
      .catch(() => setIsFailed(true));
  }, []);

  /* eslint-disable-next-line no-nested-ternary  */
  return isFailed ? (
    <BodyLarge>Unable to fetch weather data</BodyLarge>
  ) : weatherData ? (
    <Link href="/location/placeholder">
      <CardWrapper>
        <TemperatureText>{Math.round(weatherData.main.temp)}°</TemperatureText>
        <DetailsWrapper>
          <WeatherText>{weatherData.weather[0].description}</WeatherText>
          <H3>
            {weatherData.name} - {weatherData.sys.country}
          </H3>
        </DetailsWrapper>
        <WeatherIcon
          src={`/images/icons/weather/${weatherData.weather[0].icon}.webp`}
          alt={weatherData.weather[0].description}
        />
      </CardWrapper>
    </Link>
  ) : (
    <BodyLarge>Loading weather...</BodyLarge>
  );
}

export default WeatherCard;
