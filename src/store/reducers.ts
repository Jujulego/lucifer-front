import { combineReducers } from 'redux';

import authReducer from './auth/reducers';
import usersReducer from './users/reducers';

// Reducers
const appReducer = combineReducers({
  auth: authReducer,
  users: usersReducer
});

export default appReducer;