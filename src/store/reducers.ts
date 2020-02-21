import { combineReducers } from 'redux';

import authReducer from './auth/reducers';
import errorsReducer from './errors/reducers';
import usersReducer from './users/reducers';

// Reducers
const appReducer = combineReducers({
  auth: authReducer,
  errors: errorsReducer,
  users: usersReducer
});

export default appReducer;