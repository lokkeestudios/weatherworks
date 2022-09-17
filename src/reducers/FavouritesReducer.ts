interface FavouritesState {
  favouriteCityIds: number[];
}

const initialState: FavouritesState = {
  favouriteCityIds: [],
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
      return { favouriteCityIds: action.payload };
    case ActionType.ADD_FAVOURITE: {
      return {
        ...state,
        favouriteCityIds: [...state.favouriteCityIds, action.payload],
      };
    }
    case ActionType.REMOVE_FAVOURITE: {
      return {
        ...state,
        favouriteCityIds: state.favouriteCityIds.filter(
          (favouriteCityId) => favouriteCityId !== action.payload,
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
