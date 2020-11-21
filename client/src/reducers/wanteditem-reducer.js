const initialState = { items: [], loading: false };

export default function wantedItemReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_WANTED_ITEMS": {
      return { ...state, items: action.payload, loading: false };
    }

    case "DELETE_WANTED_ITEM": {
      return {
        ...state,
        items: state.items.filter((item) => item._id !== action.payload),
      };
    }

    case "ADD_WANTED_ITEM": {
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    }

    case "ITEMS_LOADING": {
      return {
        ...state,
        loading: true,
      };
    }

    default: {
      return state;
    }
  }
}
