import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';
import {
  Action,
  ActionType,
  FavouritesReducer,
  FavouritesState,
  initialState,
} from '../reducers/FavouritesReducer';
import Favourite from '../types/Favourite';

const FAVOURITES_STORAGE_KEY = 'favourites';

type FavouritesContextState = readonly [FavouritesState, Dispatch<Action>];

const FavouritesContext = createContext<FavouritesContextState | undefined>(
  undefined,
);

interface Props {
  children: ReactNode;
}

export function FavouritesContextProvider({ children }: Props) {
  const [state, dispatch] = useReducer(FavouritesReducer, initialState);

  const contextValue: FavouritesContextState = useMemo(
    () => [state, dispatch],
    [state, dispatch],
  );

  useEffect(() => {
    const storedFavourites = localStorage.getItem(FAVOURITES_STORAGE_KEY);

    if (storedFavourites === null) return;

    try {
      const initialFavourites: Favourite[] = JSON.parse(storedFavourites);
      dispatch({
        type: ActionType.INIT_STORED,
        payload: initialFavourites,
      });
    } catch (error) {
      throw new Error(
        'Favourites retrieved from local storage are not of JSON format',
      );
    }
  }, []);

  useEffect(() => {
    if (state !== initialState) {
      localStorage.setItem(
        FAVOURITES_STORAGE_KEY,
        JSON.stringify(state.favourites),
      );
    }
  }, [state]);

  return (
    <FavouritesContext.Provider value={contextValue}>
      {children}
    </FavouritesContext.Provider>
  );
}

export function useFavouritesContext() {
  const context = useContext(FavouritesContext);

  if (context === undefined) {
    throw new Error(
      'useFavouritesContext must only be used within FavouritesContextProvider',
    );
  }

  return context;
}
