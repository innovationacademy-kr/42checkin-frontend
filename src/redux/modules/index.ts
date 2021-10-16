import { combineReducers } from "redux";
import { user } from "./user";
import { config } from "./config";
import { status } from "./status";

const rootReducer = combineReducers({
  user,
  config,
  status,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
