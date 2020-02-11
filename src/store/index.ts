import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

// Root reducer
const rootReducer = combineReducers({
  test: (state = {}) => state,
});

export type AppState = ReturnType<typeof rootReducer>;

// Store
export const store = createStore(rootReducer,
  composeWithDevTools({})(
    applyMiddleware(thunk)
  )
);

export const persistor = persistStore(store);