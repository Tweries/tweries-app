import { Amplitude, AmplitudeProvider } from '@amplitude/react-amplitude';
import amplitude from 'amplitude-js';
import React from 'react';
import { render } from 'react-dom';
import App from './containers/App/App';
import augment from './store/augment';
import reducer from './store/reducer';
import config from './auth_config.json';
import { AMPLITUDE_KEY } from './constants';
import feature from './feature';
import './index.css';
import { Auth0Provider } from './react-auth0-wrapper';
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
  <AmplitudeProvider
    amplitudeInstance={amplitude.getInstance()}
    apiKey={AMPLITUDE_KEY}
  >
    <Auth0Provider
      client_id={config.clientId}
      domain={config.domain}
      onRedirectCallback={onRedirectCallback}
      redirect_uri={window.location.origin}
    >
      <Amplitude>
        {({ logEvent }) => (
          <App feature={feature} reducer={augment({ logEvent, reducer })} />
        )}
      </Amplitude>
    </Auth0Provider>
  </AmplitudeProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();
