import React from 'react';
import ReactDOM from 'react-dom';
import { CookiesProvider } from 'react-cookie';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { StylesProvider } from '@material-ui/core';

import 'configs';
import * as serviceWorker from 'serviceWorker';
import { persistor, store } from 'store';

import App from 'components/App';

// Application
ReactDOM.render((
  <StylesProvider injectFirst>
    <CookiesProvider>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
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
