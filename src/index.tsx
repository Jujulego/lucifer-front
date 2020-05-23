import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';

import { StylesProvider } from '@material-ui/core';

import 'configs';
import history from 'app.history';

import App from 'components/App';
import * as serviceWorker from 'serviceWorker';

// Application
ReactDOM.render((
  <StylesProvider injectFirst>
    <Router history={history}>
      <App />
    </Router>
  </StylesProvider>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
