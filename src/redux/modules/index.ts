import { combineReducers } from "redux";
import userReducer from "./user";
import configReducer from "./config";
import statusReducer from "./status";

const rootReducer = combineReducers({
  userReducer,
  configReducer,
  statusReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
