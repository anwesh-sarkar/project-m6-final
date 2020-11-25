const initialState = { address: null, loading: false };

export default function addressReducer(state = initialState, action) {
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

    case "UPDATE_ADDRESS_FAIL": {
      return {
        ...state,
        address: null,
        loading: false,
      };
    }

    default: {
      return state;
    }
  }
}
