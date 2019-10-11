import React from 'react';
import { render } from 'react-dom';
import { Auth0Provider } from './react-auth0-wrapper';
import config from './auth_config.json';
import App from './containers/App/App';
import './index.css';
import * as serviceWorker from './serviceWorker';

// TUTORIAL: https://manage.auth0.com/dashboard/us/dev-17-x3zfb/applications/iqgFXkcTFo9l80i7llzcurmrfgVsn3TZ/quickstart

const onRedirectCallback = appState => {
  window.history.replaceState(
    {},
    document.title,
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};

render(
  <Auth0Provider
    client_id={config.clientId}
    domain={config.domain}
    onRedirectCallback={onRedirectCallback}
    redirect_uri={window.location.origin}
  >
    <App />
  </Auth0Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
