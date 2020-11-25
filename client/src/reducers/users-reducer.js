const initialState = { users: [], loading: false };

export default function allUsersReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_ALL_USERS": {
      return {
        ...state,
        users: action.payload,
        loading: false,
      };
    }

    case "USERS_LOADING": {
      return {
        ...state,
        loading: true,
      };
    }

    case "USER_LOADING_FAIL": {
      return state;
    }

    default: {
      return state;
    }
  }
}
