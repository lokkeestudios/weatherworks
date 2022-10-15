interface FavouritesState {
  favouriteLocationIds: number[];
}

const initialState: FavouritesState = {
  favouriteLocationIds: [],
};

enum ActionType {
  INIT_STORED = 'INIT_STORED',
  ADD_FAVOURITE = 'ADD_FAVOURITE',
  REMOVE_FAVOURITE = 'REMOVE_FAVOURITE',
}

type Action =
  | { type: ActionType.INIT_STORED; payload: number[] }
  | { type: ActionType.ADD_FAVOURITE; payload: number }
  | { type: ActionType.REMOVE_FAVOURITE; payload: number };

const FavouritesReducer = (state: FavouritesState, action: Action) => {
  switch (action.type) {
    case ActionType.INIT_STORED:
      return { favouriteLocationIds: action.payload };
    case ActionType.ADD_FAVOURITE: {
      return {
        ...state,
        favouriteLocationIds: [...state.favouriteLocationIds, action.payload],
      };
    }
    case ActionType.REMOVE_FAVOURITE: {
      return {
        ...state,
        favouriteLocationIds: state.favouriteLocationIds.filter(
          (favouriteLocationId) => favouriteLocationId !== action.payload,
        ),
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
