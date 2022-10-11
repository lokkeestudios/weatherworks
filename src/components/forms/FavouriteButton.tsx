import ActiveFavouriteIcon from '@/components/icons/ActiveFavouriteIcon';
import InactiveFavouriteIcon from '@/components/icons/InactiveFavouriteIcon';
import {
  MAX_FAVOURITES,
  useFavouritesContext,
} from '@/contexts/FavouritesContext';
import { ActionType } from '@/reducers/FavouritesReducer';
import { useCallback } from 'react';

interface Props {
  cityId: number;
}

function FavouriteButton({ cityId }: Props) {
  const [favourites, dispatch] = useFavouritesContext();

  const handleAddToFavourites = useCallback(() => {
    dispatch({
      type: ActionType.ADD_FAVOURITE,
      payload: cityId,
    });
  }, [cityId]);

  const handleRemoveFromFavourites = useCallback(() => {
    dispatch({
      type: ActionType.REMOVE_FAVOURITE,
      payload: cityId,
    });
  }, [cityId]);

  const isCityFavourite = favourites.favouriteCityIds.includes(cityId);
  const isFavouriteButtonDisplayed =
    favourites.favouriteCityIds.length < MAX_FAVOURITES || isCityFavourite;

  const FavouriteIcon = isCityFavourite
    ? ActiveFavouriteIcon
    : InactiveFavouriteIcon;

  if (!isFavouriteButtonDisplayed) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={
        isCityFavourite ? handleRemoveFromFavourites : handleAddToFavourites
      }
      className="text-neutrals-300 transition-colors duration-200 focus-visible:text-slate-50 hover:text-slate-50"
    >
      <FavouriteIcon className="h-6 w-6" />
    </button>
  );
}

export default FavouriteButton;
