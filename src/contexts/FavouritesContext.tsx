import {
  Action,
  ActionType,
  FavouritesReducer,
  FavouritesState,
  initialState,
} from '@/reducers/FavouritesReducer';
import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';

const FAVOURITES_STORAGE_KEY = 'favourites';
const MAX_FAVOURITES = 4;

type FavouritesContextState = readonly [FavouritesState, Dispatch<Action>];

const FavouritesContext = createContext<FavouritesContextState | undefined>(
  undefined,
);

interface Props {
  children: ReactNode;
}

function FavouritesContextProvider({ children }: Props) {
  const [state, dispatch] = useReducer(FavouritesReducer, initialState);

  const contextValue: FavouritesContextState = useMemo(
    () => [state, dispatch],
    [state, dispatch],
  );

  useEffect(() => {
    const storedFavourites = localStorage.getItem(FAVOURITES_STORAGE_KEY);

    if (storedFavourites === null) return;

    try {
      const initialFavourites = JSON.parse(storedFavourites) as number[];
      dispatch({
        type: ActionType.INIT_STORED,
        payload: initialFavourites,
      });
    } catch (error) {
      throw new Error(
        'Favourites retrieved from local storage are not of correct JSON format',
      );
    }
  }, []);

  useEffect(() => {
    if (state !== initialState) {
      localStorage.setItem(
        FAVOURITES_STORAGE_KEY,
        JSON.stringify(state.favouriteLocationIds),
      );
    }
  }, [state]);

  return (
    <FavouritesContext.Provider value={contextValue}>
      {children}
    </FavouritesContext.Provider>
  );
}

function useFavouritesContext() {
  const context = useContext(FavouritesContext);

  if (context === undefined) {
    throw new Error(
      'useFavouritesContext must only be used within FavouritesContextProvider',
    );
  }

  return context;
}

export { FavouritesContextProvider, useFavouritesContext, MAX_FAVOURITES };
