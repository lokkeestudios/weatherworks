import WeatherCard from '@/components/cards/WeatherCard';
import { QueryKeys } from '@/proxies';
import getCurrentWeatherByLocationId from '@/proxies/getCurrentWeatherByLocationId';
import { useQuery } from '@tanstack/react-query';

interface Props {
  locationId: number;
}

function LocationIdWeatherCard({ locationId }: Props) {
  const currentWeatherQuery = useQuery(
    QueryKeys.currentWeather(locationId),
    async () => getCurrentWeatherByLocationId(locationId),
  );

  return <WeatherCard currentWeatherQuery={currentWeatherQuery} />;
}

export default LocationIdWeatherCard;
