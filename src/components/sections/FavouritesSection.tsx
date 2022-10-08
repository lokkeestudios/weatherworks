import WeatherCard from '@/components/cards/WeatherCard';
import {
  MAX_FAVOURITES,
  useFavouritesContext,
} from '@/contexts/FavouritesContext';
import { AiFillStar as FavouriteIcon } from 'react-icons/ai';

function FavouritesSection() {
  const [favourites] = useFavouritesContext();

  return (
    <section className="py-8">
      <h2>{`Your favourites (${favourites.favouriteCityIds.length}/${MAX_FAVOURITES})`}</h2>
      <div className="flex flex-col gap-x-4">
        {favourites.favouriteCityIds.length === 0 && (
          <>
            <FavouriteIcon size={128} />
            <h3>No favourites yet</h3>
            <p>Locations you mark as favourite are shown here</p>
          </>
        )}
        {favourites.favouriteCityIds.map((favouriteCityId) => (
          <WeatherCard
            key={favouriteCityId}
            cityId={favouriteCityId}
          />
        ))}
      </div>
    </section>
  );
}

export default FavouritesSection;
