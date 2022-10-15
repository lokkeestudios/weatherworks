import WeatherCard from '@/components/cards/WeatherCard';
import Container from '@/components/Container';
import {
  MAX_FAVOURITES,
  useFavouritesContext,
} from '@/contexts/FavouritesContext';
import { AiFillStar as FavouriteIcon } from 'react-icons/ai';

function FavouritesSection() {
  const [favourites] = useFavouritesContext();

  return (
    <section
      className="relative z-1 py-8"
      aria-label="Your favourites"
    >
      <Container>
        <h2 className="mb-8 font-display font-bold leading-tight text-4xl">{`Your favourites (${favourites.favouriteLocationIds.length}/${MAX_FAVOURITES})`}</h2>
        <div className="flex flex-col gap-y-3">
          {favourites.favouriteLocationIds.length === 0 && (
            <>
              <FavouriteIcon size={128} />
              <h3>No favourites yet</h3>
              <p>Locations you mark as favourite are shown here</p>
            </>
          )}
          {favourites.favouriteLocationIds.map((favouriteLocationId) => (
            <WeatherCard
              key={favouriteLocationId}
              locationId={favouriteLocationId}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

export default FavouritesSection;
