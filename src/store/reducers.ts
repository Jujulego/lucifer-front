import { combineReducers } from 'redux';

import authReducer from './auth/reducers';
import errorsReducer from './errors/reducers';

// Reducers
const appReducer = combineReducers({
  auth: authReducer,
  errors: errorsReducer
});

export default appReducer;
