import { Amplitude, AmplitudeProvider } from '@amplitude/react-amplitude';
import amplitude from 'amplitude-js';
import FeatureProvider, { setFeatures } from 'feature-provider';
import React from 'react';
import { render } from 'react-dom';
import './styles.css';
import config from './auth_config.json';
import { AMPLITUDE_KEY } from './constants';
import App from './containers/App/App';
import features from './features';
import initializeReactGA from './initializeReactGA';
import { Auth0Provider } from './react-auth0-wrapper';
import * as serviceWorker from './serviceWorker';
import augment from './store/augment';
import makeInitialState from './store/makeInitialState';
import makeReducer from './store/makeReducer';

const feature = setFeatures(features);

// TUTORIAL: https://manage.auth0.com/dashboard/us/dev-17-x3zfb/applications/iqgFXkcTFo9l80i7llzcurmrfgVsn3TZ/quickstart
function onRedirectCallback(appState) {
  window.history.replaceState(
    {},
    document.title,
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
}

render(
  <Auth0Provider
    client_id={config.clientId}
    domain={config.domain}
    onRedirectCallback={onRedirectCallback}
    redirect_uri={window.location.origin}
  >
    <AmplitudeProvider
      amplitudeInstance={amplitude.getInstance()}
      apiKey={AMPLITUDE_KEY}
    >
      <Amplitude>
        {({ logEvent }) => (
          <FeatureProvider features={features}>
            <App
              initialState={makeInitialState({ feature })}
              reducer={augment({ logEvent, reducer: makeReducer(feature) })}
            />
          </FeatureProvider>
        )}
      </Amplitude>
    </AmplitudeProvider>
  </Auth0Provider>,
  document.getElementById('root'),
  initializeReactGA()
);

serviceWorker.unregister();
