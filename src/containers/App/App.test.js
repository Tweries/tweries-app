import { fireEvent, render } from '@testing-library/react';
import FeatureProvider, { setFeatures } from 'feature-provider';
import React from 'react';
import Footer from '../../components/Footer/Footer';
import { DANGER, SUCCESS } from '../../constants';
import features from '../../features';
import { useAuth0 } from '../../react-auth0-wrapper';
import makeReducer, { types } from '../../store/makeReducer';
import App from './App';

jest.mock('../../components/Footer/Footer');
jest.mock('../../react-auth0-wrapper');

const feature = setFeatures(features);

const user = {
  name: 'tweries-app',
  picture:
    'https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png',
  sub: 'twitter|1183836409850814464'
};

describe('<App />', () => {
  beforeEach(() => {
    Footer.mockImplementation(() => <div>Footer</div>);
  });

  it('loading', () => {
    useAuth0.mockImplementation(() => ({
      loading: true
    }));

    const initialState = {};

    const { getByText } = render(
      <FeatureProvider features={features}>
        <App initialState={initialState} reducer={makeReducer(feature)} />
      </FeatureProvider>
    );

    expect(getByText('...')).toBeInTheDocument();
  });

  it('not authenticated', () => {
    useAuth0.mockImplementation(() => ({
      isAuthenticated: false
    }));

    const initialState = {};

    const { getByTestId } = render(
      <FeatureProvider features={features}>
        <App initialState={initialState} reducer={makeReducer(feature)} />
      </FeatureProvider>
    );

    expect(getByTestId('login')).toBeInTheDocument();
  });

  it('authenticated', () => {
    useAuth0.mockImplementation(() => ({
      isAuthenticated: true,
      user
    }));

    const initialState = {};

    const { getByTestId } = render(
      <FeatureProvider features={features}>
        <App initialState={initialState} reducer={makeReducer(feature)} />
      </FeatureProvider>
    );

    expect(getByTestId('logout')).toBeInTheDocument();
  });

  it('notification danger', () => {
    useAuth0.mockImplementation(() => ({
      isAuthenticated: true,
      user
    }));

    const initialState = {
      notification: { message: 'Oh Noes!', type: DANGER }
    };

    const mockReducer = jest.fn((state, action) =>
      makeReducer(feature)(state, action)
    );

    const { getByTestId } = render(
      <FeatureProvider features={features}>
        <App initialState={initialState} reducer={mockReducer} />
      </FeatureProvider>
    );

    fireEvent.click(getByTestId('dismiss'));

    expect(mockReducer).toBeCalledTimes(2);
    expect(mockReducer.mock.calls[1][1]).toEqual({ type: types.DISMISS_TOAST }); // [1][1] === [the send time][the action parameter]
  });

  it('notification success', () => {
    jest.useFakeTimers();

    useAuth0.mockImplementation(() => ({
      isAuthenticated: true,
      user
    }));

    const initialState = {
      notification: {
        link: 'https://twitter.com/1183836409850814464/status/1230233654959407104',
        type: SUCCESS
      }
    };

    const mockReducer = jest.fn((state, action) =>
      makeReducer(feature)(state, action)
    );

    render(
      <FeatureProvider features={features}>
        <App initialState={initialState} reducer={mockReducer} />
      </FeatureProvider>
    );

    jest.advanceTimersByTime(4000);

    expect(mockReducer).toBeCalledTimes(2);
    expect(mockReducer.mock.calls[1][1]).toEqual({ type: types.DISMISS_TOAST }); // [1][1] === [the send time][the action parameter]
  });
});
