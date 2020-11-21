const initialState = { address: null, user: null, loading: false };

export default function address(state = initialState, action) {
  switch (action.type) {
    case "GET_ADDRESS": {
      return {
        ...state,
        address: action.payload,
        loading: false,
      };
    }

    case "UPDATE_ADDRESS": {
      return {
        ...state,
        address: action.payload,
        loading: false,
      };
    }

    case "LOADING_ADDRESS": {
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
