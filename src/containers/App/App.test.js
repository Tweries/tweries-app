import {
  cleanup,
  render,
  fireEvent,
  waitForDomChange
} from '@testing-library/react';
import FeatureProvider, { setFeatures } from 'feature-provider';
import React from 'react';
import Footer from '../../components/Footer/Footer';
import NavBar from '../../components/NavBar/NavBar';
import makeReducer from '../../store/makeReducer';
import features from '../../features';
import { useAuth0 } from '../../react-auth0-wrapper';
import App from './App';
import makeInitialState from '../../store/makeInitialState';
import { HIDE_TAGS_V1 } from '../../constants';

jest.mock('../../components/Footer/Footer');
jest.mock('../../components/NavBar/NavBar');
jest.mock('../../react-auth0-wrapper');

const feature = setFeatures(features);

const user = {
  name: 'tweries-app',
  picture:
    'https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png',
  sub: 'twitter|1183836409850814464'
};

describe('App', () => {
  beforeEach(() => {
    fetch.mockResponseOnce(JSON.stringify({ data: { message: 'baz' } }));
    Footer.mockImplementation(() => <div>Footer</div>);
    NavBar.mockImplementation(() => <div>NavBar</div>);
  });

  afterEach(() => {
    fetch.resetMocks();
    cleanup();
  });

  it('loading', () => {
    useAuth0.mockImplementation(() => ({
      loading: true
    }));

    const { container } = render(
      <FeatureProvider features={features}>
        <App
          initialState={makeInitialState({ feature })}
          reducer={makeReducer(feature)}
        />
      </FeatureProvider>
    );

    expect(container).toMatchSnapshot();
  });

  it('unauthenticated user', () => {
    useAuth0.mockImplementation(() => ({
      isAuthenticated: false
    }));

    const { container } = render(
      <FeatureProvider features={features}>
        <App
          initialState={makeInitialState({ feature })}
          reducer={makeReducer(feature)}
        />
      </FeatureProvider>
    );

    expect(container).toMatchSnapshot();
  });

  it('log in', () => {
    const mockLoginWithRedirect = jest.fn();
    useAuth0.mockImplementation(() => ({
      loginWithRedirect: mockLoginWithRedirect
    }));

    const { getByTestId } = render(
      <FeatureProvider features={features}>
        <App
          initialState={makeInitialState({ feature })}
          reducer={makeReducer(feature)}
        />
      </FeatureProvider>
    );

    fireEvent.click(getByTestId('login'));

    expect(mockLoginWithRedirect).toBeCalled();
  });

  it('generate tweetstorm and dismiss notification', async () => {
    fetch.mockResponseOnce(JSON.stringify({ data: { message: 'qux' } })); // INFO: adding a second response
    useAuth0.mockImplementation(() => ({
      isAuthenticated: true,
      user
    }));

    const { container, getByTestId } = render(
      <FeatureProvider
        features={features.filter(value => value !== HIDE_TAGS_V1)}
      >
        <App
          initialState={makeInitialState({ feature })}
          reducer={makeReducer(feature)}
        />
      </FeatureProvider>
    );
    fireEvent.change(getByTestId('source'), { target: { value: 'foo' } });
    fireEvent.change(getByTestId('hashtags'), { target: { value: '#bar' } });
    await waitForDomChange();
    fireEvent.click(getByTestId('tweet'));
    await waitForDomChange();
    fireEvent.click(getByTestId('dismiss'));

    expect(container).toMatchSnapshot();
  });
});

describe('App - errors', () => {
  it('fetchHealth error', () => {
    fetch.resetMocks();
    fetch.mockRejectOnce(new Error('Oh Noes!'));
    Footer.mockImplementation(() => <div>Footer</div>);
    NavBar.mockImplementation(() => <div>NavBar</div>);

    useAuth0.mockImplementation(() => ({
      isAuthenticated: false
    }));
    const mockReducer = jest.fn((state, action) =>
      makeReducer(feature)(state, action)
    );

    render(
      <FeatureProvider features={features}>
        <App
          initialState={makeInitialState({ feature })}
          reducer={mockReducer}
        />
      </FeatureProvider>
    );

    // TODO: add assertion
  });

  it('fetchTweetstorm error', async () => {
    fetch.resetMocks();
    fetch.mockResponseOnce(JSON.stringify({ data: { message: 'baz' } }));
    fetch.mockRejectOnce(new Error('Oh Noes!'));
    Footer.mockImplementation(() => <div>Footer</div>);
    NavBar.mockImplementation(() => <div>NavBar</div>);

    useAuth0.mockImplementation(() => ({
      isAuthenticated: true,
      user
    }));
    const mockReducer = jest.fn((state, action) =>
      makeReducer(feature)(state, action)
    );

    const { getByTestId } = render(
      <FeatureProvider features={features}>
        <App
          initialState={makeInitialState({ feature })}
          reducer={mockReducer}
        />
      </FeatureProvider>
    );
    fireEvent.change(getByTestId('source'), { target: { value: 'foo' } });
    await waitForDomChange();
    fireEvent.click(getByTestId('tweet'));
    await waitForDomChange();

    // TODO: add assertion
  });
});
