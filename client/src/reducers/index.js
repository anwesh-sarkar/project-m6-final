import { combineReducers } from "redux";

import authReducer from "./auth-reducer";
import errorReducer from "./error-reducer";
import offeredItemReducer from "./offereditem-reducer";

export default combineReducers({
  auth: authReducer,
  error: errorReducer,
  offered: offeredItemReducer,
});
