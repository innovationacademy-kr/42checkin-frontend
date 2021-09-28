import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './modules/index';

const env = process.env.NODE_ENV;
const middlewares = [];

if (env === 'development') {
  const { logger } = require('redux-logger');
  middlewares.push(logger);
}

let configureStore;
if (env === 'development') {
  configureStore = initialState =>
    createStore(rootReducer, composeWithDevTools(applyMiddleware(...middlewares)));
} else {
  configureStore = initialState => createStore(rootReducer, applyMiddleware(...middlewares));
}

export default configureStore();
