import React from 'react';
import { render } from 'react-dom';
import App from './containers/App/App';
import augment from './store/augment';
import reducer from './store/reducer';
import config from './auth_config.json';
import './index.css';
import { Auth0Provider } from './react-auth0-wrapper';
import * as serviceWorker from './serviceWorker';

// <feature-toggles>
const PICK_YOUR_OWN_LINEFEED_V1 = 'PICK_YOUR_OWN_LINEFEED_V1';

const features = [PICK_YOUR_OWN_LINEFEED_V1];

function setFeatures(features) {
  return {
    active: feature => {
      if (features) {
        return features.indexOf(feature) > -1;
      }
      return false;
    }
  };
}
// </ feature-toggles>

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
    redirect_uri={window.location.href}
  >
    <App feature={setFeatures(features)} reducer={augment(reducer)} />
  </Auth0Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
