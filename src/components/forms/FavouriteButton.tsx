import ActiveFavouriteIcon from '@/components/icons/ActiveFavouriteIcon';
import InactiveFavouriteIcon from '@/components/icons/InactiveFavouriteIcon';
import {
  MAX_FAVOURITES,
  useFavouritesContext,
} from '@/contexts/FavouritesContext';
import { ActionType } from '@/reducers/FavouritesReducer';
import { useCallback } from 'react';

interface Props {
  locationId: number;
}

function FavouriteButton({ locationId }: Props) {
  const [favourites, dispatch] = useFavouritesContext();

  const handleAddToFavourites = useCallback(() => {
    dispatch({
      type: ActionType.ADD_FAVOURITE,
      payload: locationId,
    });
  }, [dispatch, locationId]);

  const handleRemoveFromFavourites = useCallback(() => {
    dispatch({
      type: ActionType.REMOVE_FAVOURITE,
      payload: locationId,
    });
  }, [dispatch, locationId]);

  const isCityFavourite = favourites.favouriteLocationIds.includes(locationId);
  const isFavouriteButtonDisplayed =
    favourites.favouriteLocationIds.length < MAX_FAVOURITES || isCityFavourite;

  const FavouriteIcon = isCityFavourite
    ? ActiveFavouriteIcon
    : InactiveFavouriteIcon;

  if (!isFavouriteButtonDisplayed) {
    return null;
  }

  return (
    <button
      type="button"
      title="Toggle favourite status"
      onClick={
        isCityFavourite ? handleRemoveFromFavourites : handleAddToFavourites
      }
      className="text-neutrals-50/70 transition-colors duration-200 focus-visible:text-slate-50 hover:text-slate-50"
    >
      <FavouriteIcon className="h-7 w-7 lg:h-8 lg:w-8" />
    </button>
  );
}

export default FavouriteButton;
