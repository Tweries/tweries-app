import { render } from '@testing-library/react';
import React from 'react';
import { useAuth0 } from '../../react-auth0-wrapper';
import App from './App';
import makeInitialState from '../../store/makeInitialState';

jest.mock('../../react-auth0-wrapper');

describe('App', () => {
  beforeEach(() => {
    fetch.mockResponseOnce(
      JSON.stringify({ data: { message: 'HELLO FROM MOCK' } })
    );
  });

  afterEach(() => {
    fetch.resetMocks();
  });

  it('loading', () => {
    useAuth0.mockImplementation(() => ({
      loading: true
    }));

    const { container } = render(
      <App reducer={jest.fn((state = makeInitialState({}), action) => state)} />
    );

    expect(container).toMatchSnapshot();
  });

  it('unauthenticated user', () => {
    useAuth0.mockImplementation(() => ({
      isAuthenticated: false,
      loading: false
    }));

    const feature = { active: jest.fn() };

    const { container } = render(
      <App
        feature={feature}
        reducer={jest.fn((state = makeInitialState({}), action) => state)}
      />
    );

    expect(container).toMatchSnapshot();
  });
});
