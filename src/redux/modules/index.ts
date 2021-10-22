import { combineReducers } from "redux";
import userReducer from "./user";
import configReducer from "./config";

const rootReducer = combineReducers({
  userReducer,
  configReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
