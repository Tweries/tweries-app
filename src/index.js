import { Amplitude, AmplitudeProvider } from '@amplitude/react-amplitude';
import amplitude from 'amplitude-js';
import React from 'react';
import { render } from 'react-dom';
import Layout from './components/Layout/Layout';
import App from './containers/App/App';
import augment from './store/augment';
import makeInitialState from './store/makeInitialState';
import makeReducer from './store/makeReducer';
import './index.css';
import config from './auth_config.json';
import { AMPLITUDE_KEY, NEWLINE } from './constants';
import feature from './feature';
import initializeReactGA from './initializeReactGA';
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

function renderApp(logEvent) {
  const { REACT_APP_LAYOUT_V1 } = process.env;
  if (REACT_APP_LAYOUT_V1 === 'true') {
    return <Layout />;
  }
  initializeReactGA();
  return (
    <App
      feature={feature}
      initialState={makeInitialState({
        feature,
        linefeed: NEWLINE
      })}
      reducer={augment({ logEvent, reducer: makeReducer(feature) })}
    />
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
      <Amplitude>{({ logEvent }) => renderApp(logEvent)}</Amplitude>
    </AmplitudeProvider>
  </Auth0Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
