import { combineReducers } from 'redux';

import { reducer as auth } from 'auth/auth.reducer';
import errorsReducer from './errors/reducers';

// Reducers
const appReducer = combineReducers({
  auth,
  errors: errorsReducer
});

export default appReducer;
