const initialState = { items: [], loading: false };

export default function offeredItemReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_OFFERED_ITEMS": {
      return { ...state, items: action.payload, loading: false };
    }

    case "DELETE_OFFERED_ITEM": {
      return {
        ...state,
        items: state.items.filter((item) => item._id !== action.payload),
      };
    }

    case "ADD_OFFERED_ITEM": {
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

    case "GET_ALL_OFFERED_ITEMS": {
      return {
        ...state,
        items: action.payload,
        loading: false,
      };
    }

    default: {
      return state;
    }
  }
}
