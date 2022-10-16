import WeatherCard from '@/components/cards/WeatherCard';
import { QueryKeys } from '@/proxies';
import getCurrentWeatherByGeolocation from '@/proxies/getCurrentWeatherByGeolocation';
import Geolocation from '@/types/Geolocation';
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
