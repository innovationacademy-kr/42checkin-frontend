import { combineReducers } from 'redux';
import { user } from './user';
import { config } from './config';
import { status } from './status';

const rootReducer = combineReducers({
  user: user,
  config: config,
  status: status
});

export default rootReducer;
