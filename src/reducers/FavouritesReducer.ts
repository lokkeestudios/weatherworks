import Favourite from '../types/Favourite';

interface FavouritesState {
  favourites: Favourite[];
}

const initialState: FavouritesState = {
  favourites: [],
};

enum ActionType {
  INIT_STORED = 'INIT_STORED',
  ADD_FAVOURITE = 'ADD_FAVOURITE',
  REMOVE_FAVOURITE = 'REMOVE_FAVOURITE',
}

type Action =
  | { type: ActionType.INIT_STORED; payload: Favourite[] }
  | { type: ActionType.ADD_FAVOURITE; payload: Favourite }
  | { type: ActionType.REMOVE_FAVOURITE; payload: number };

const FavouritesReducer = (state: FavouritesState, action: Action) => {
  switch (action.type) {
    case ActionType.INIT_STORED:
      return { favourites: action.payload };
    case ActionType.ADD_FAVOURITE: {
      return {
        ...state,
        favourites: [...state.favourites, action.payload],
      };
    }
    case ActionType.REMOVE_FAVOURITE: {
      return {
        ...state,
        items: [
          state.favourites.filter(
            (favourite) => favourite.id !== action.payload,
          ),
        ],
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${JSON.stringify(action)}`);
    }
  }
};

export {
  initialState,
  FavouritesReducer,
  type FavouritesState,
  type Action,
  ActionType,
};
