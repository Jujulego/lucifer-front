import React from 'react';
import ReactDOM from 'react-dom';

import { StylesProvider } from '@material-ui/core';

import 'configs';
import history from 'app.history';

import App from 'components/App';
import * as serviceWorker from 'serviceWorker';
import Auth0Provider from 'auth/components/Auth0Provider';

// Callback
const onRedirectCallback = (state: any) => {
  history.push((state && state.targetUrl) || window.location.pathname);
};

// Application
ReactDOM.render((
  <StylesProvider injectFirst>
    <Auth0Provider
      domain="dev-lucifer.eu.auth0.com"
      client_id="EiFpapg4lwQb1jJGtVGv7pMx49QIgEaP"
      redirect_uri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
    >
      <App />
    </Auth0Provider>
  </StylesProvider>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
