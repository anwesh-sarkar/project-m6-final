const initialState = { term: null };

export default function searchTermReducer(state = initialState, action) {
  switch (action.type) {
    case "SEARCH_TERM": {
      console.log(action.payload);
      return {
        ...state,
        term: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}
