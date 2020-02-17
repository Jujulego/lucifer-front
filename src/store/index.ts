import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

import appReducer from './reducers';

// Types
export type AppState = ReturnType<typeof appReducer>;

// Store
export const store = createStore(appReducer,
  composeWithDevTools({})(
    applyMiddleware(thunk)
  )
);

export const persistor = persistStore(store);