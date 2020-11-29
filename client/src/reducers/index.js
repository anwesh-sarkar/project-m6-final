import { combineReducers } from "redux";

import authReducer from "./auth-reducer";
import errorReducer from "./error-reducer";
import offeredItemReducer from "./offereditem-reducer";
import wantedItemReducer from "./wanteditem-reducer";
import addressReducer from "./address-reducer";
import allUsersReducer from "./users-reducer";
import searchTermReducer from "./searchterm-reducer";

export default combineReducers({
  auth: authReducer,
  error: errorReducer,
  offered: offeredItemReducer,
  wanted: wantedItemReducer,
  address: addressReducer,
  allUsers: allUsersReducer,
  search: searchTermReducer,
});
