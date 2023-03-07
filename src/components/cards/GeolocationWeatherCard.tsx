import WeatherCard from '@/components/cards/WeatherCard';
import Geolocation from '@/types/Geolocation';
import { QueryKeys } from '@/utils';
import getCurrentWeatherByGeolocation from '@/utils/getCurrentWeatherByGeolocation';
import { useQuery } from '@tanstack/react-query';

interface Props {
  geolocation: Geolocation;
}

function GeolocationWeatherCard({ geolocation }: Props) {
  const currentWeatherQuery = useQuery(
    QueryKeys.currentWeather(geolocation),
    async () => getCurrentWeatherByGeolocation(geolocation),
  );

  return <WeatherCard currentWeatherQuery={currentWeatherQuery} />;
}

export default GeolocationWeatherCard;
