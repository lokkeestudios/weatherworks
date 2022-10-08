import {
  MAX_FAVOURITES,
  useFavouritesContext,
} from '@/contexts/FavouritesContext';
import { ActionType } from '@/reducers/FavouritesReducer';
import { useCallback } from 'react';
import {
  AiFillStar as EnabledFavouriteIcon,
  AiOutlineStar as DisabledFavouriteIcon,
} from 'react-icons/ai';

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
    ? EnabledFavouriteIcon
    : DisabledFavouriteIcon;

  if (!isFavouriteButtonDisplayed) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={
        isCityFavourite ? handleRemoveFromFavourites : handleAddToFavourites
      }
      className="focus-visible:text-slate-300 hover:text-slate-300"
    >
      <FavouriteIcon size={24} />
    </button>
  );
}

export default FavouriteButton;
