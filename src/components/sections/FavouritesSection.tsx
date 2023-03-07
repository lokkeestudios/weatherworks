import LocationIdWeatherCard from '@/components/cards/LocationIdWeatherCard';
import Container from '@/components/Container';
import ActiveFavouriteIcon from '@/components/icons/ActiveFavouriteIcon';
import {
  MAX_FAVOURITES,
  useFavouritesContext,
} from '@/contexts/FavouritesContext';

function FavouritesSection() {
  const [favourites] = useFavouritesContext();

  return (
    <section
      className="relative z-1 py-8"
      aria-label="Your favourites"
    >
      <Container>
        <h2 className="mb-8 font-display font-bold leading-tight text-4xl">{`Your favourites (${favourites.favouriteLocationIds.length}/${MAX_FAVOURITES})`}</h2>
        <div className="flex flex-col items-center gap-y-3">
          {favourites.favouriteLocationIds.length === 0 && (
            <>
              <ActiveFavouriteIcon className="h-24 w-24 text-neutrals-50/70 md:h-36 md:w-36" />
              <h3 className="font-display font-bold text-2xl">
                No favourites yet
              </h3>
              <p className="text-center text-base">
                Locations you mark as favourite are shown here
              </p>
            </>
          )}
          {favourites.favouriteLocationIds.map((favouriteLocationId) => (
            <LocationIdWeatherCard
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
