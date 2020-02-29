import { combineReducers } from 'redux';

import authReducer from './auth/reducers';
import daemonsReducer from 'store/daemons/reducers';
import errorsReducer from './errors/reducers';
import usersReducer from './users/reducers';

// Reducers
const appReducer = combineReducers({
  auth: authReducer,
  daemons: daemonsReducer,
  errors: errorsReducer,
  users: usersReducer
});

export default appReducer;
