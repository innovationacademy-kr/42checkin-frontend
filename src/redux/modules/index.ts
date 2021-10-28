import { combineReducers } from "redux";
import userReducer from "./user";
import clusterReducer from "./cluster";

const rootReducer = combineReducers({
  userReducer,
  clusterReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
