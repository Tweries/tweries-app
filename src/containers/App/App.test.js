import {
  cleanup,
  render,
  fireEvent,
  waitForDomChange
} from '@testing-library/react';
import React from 'react';
import Footer from '../../components/Footer/Footer';
import NavBar from '../../components/NavBar/NavBar';
import FeatureContext from '../../FeatureContext/FeatureContext';
import makeReducer from '../../store/makeReducer';
import feature from '../../feature';
import { useAuth0 } from '../../react-auth0-wrapper';
import App from './App';
import makeInitialState from '../../store/makeInitialState';

jest.mock('../../components/Footer/Footer');
jest.mock('../../components/NavBar/NavBar');
jest.mock('../../react-auth0-wrapper');

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
      <FeatureContext.Provider value={feature}>
        <App
          initialState={makeInitialState({ feature })}
          reducer={makeReducer(feature)}
        />
      </FeatureContext.Provider>
    );

    expect(container).toMatchSnapshot();
  });

  it('unauthenticated user', () => {
    useAuth0.mockImplementation(() => ({
      isAuthenticated: false,
      loading: false
    }));

    const { container } = render(
      <FeatureContext.Provider value={feature}>
        <App
          initialState={makeInitialState({ feature })}
          reducer={makeReducer(feature)}
        />
      </FeatureContext.Provider>
    );

    expect(container).toMatchSnapshot();
  });

  it('generate tweetstorm and dismiss notification', async () => {
    fetch.mockResponseOnce(JSON.stringify({ data: { message: 'qux' } })); // INFO: adding a second response
    useAuth0.mockImplementation(() => ({
      isAuthenticated: true,
      loading: false,
      user
    }));

    const { container, getByTestId } = render(
      <FeatureContext.Provider value={feature}>
        <App
          initialState={makeInitialState({ feature })}
          reducer={makeReducer(feature)}
        />
      </FeatureContext.Provider>
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
      isAuthenticated: false,
      loading: false
    }));
    const mockReducer = jest.fn((state, action) =>
      makeReducer(feature)(state, action)
    );

    render(
      <FeatureContext.Provider value={feature}>
        <App
          initialState={makeInitialState({ feature })}
          reducer={mockReducer}
        />
      </FeatureContext.Provider>
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
      loading: false,
      user
    }));
    const feature = { active: () => false };
    const mockReducer = jest.fn((state, action) =>
      makeReducer(feature)(state, action)
    );

    const { getByTestId } = render(
      <FeatureContext.Provider value={feature}>
        <App
          initialState={makeInitialState({ feature })}
          reducer={mockReducer}
        />
      </FeatureContext.Provider>
    );
    fireEvent.change(getByTestId('source'), { target: { value: 'foo' } });
    await waitForDomChange();
    fireEvent.click(getByTestId('tweet'));
    await waitForDomChange();

    // TODO: add assertion
  });
});
