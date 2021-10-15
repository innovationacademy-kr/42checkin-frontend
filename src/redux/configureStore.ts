import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";
import rootReducer from "./modules/index";

const env = process.env.NODE_ENV;

let configureStore;
if (env === "development") {
  configureStore = () => createStore(rootReducer, composeWithDevTools(applyMiddleware(logger)));
} else {
  configureStore = () => createStore(rootReducer, applyMiddleware());
}

export default configureStore();

export type RootState = ReturnType<typeof rootReducer>;
