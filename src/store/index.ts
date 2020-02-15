import axios from 'axios';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

import authReducer from './auth/reducers';

// Root reducer
const rootReducer = combineReducers({
  auth: authReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

// Store
export const store = createStore(rootReducer,
  composeWithDevTools({})(
    applyMiddleware(thunk)
  )
);

export const persistor = persistStore(store, null,
  () => {
    const state = store.getState();

    if (state.auth.token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${state.auth.token}`;
    }
  }
);