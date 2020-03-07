import axios from 'axios';
import React from 'react';
import { CookiesProvider } from 'react-cookie';
import ReactDOM from 'react-dom';

import { StylesProvider } from '@material-ui/core';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import './configs';
import App from 'components/App';
import * as serviceWorker from 'serviceWorker';
import { persistor, store } from 'store';

// Handlers
function handleBeforeLift() {
  const state = store.getState();

  if (state.auth.token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${state.auth.token}`;
  }
}

// Application
ReactDOM.render((
  <StylesProvider injectFirst>
    <CookiesProvider>
      <Provider store={store}>
        <PersistGate persistor={persistor} onBeforeLift={handleBeforeLift}>
          <App />
        </PersistGate>
      </Provider>
    </CookiesProvider>
  </StylesProvider>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
