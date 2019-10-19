import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { useAuth0 } from '../../react-auth0-wrapper';
import NavBar from './NavBar';

jest.mock('../../react-auth0-wrapper');

const user = {
  name: 'china-musk',
  picture:
    'https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png',
  sub: 'twitter|1183836409850814464'
};

describe('NavBar', () => {
  const scenarios = [
    {
      arrange: () => {
        useAuth0.mockImplementation(() => ({
          isAuthenticated: true,
          user
        }));
      },
      description: 'authenticated user'
    },
    {
      arrange: () => {
        useAuth0.mockImplementation(() => ({ isAuthenticated: false }));
      },
      description: 'unauthenticated user'
    }
  ];

  scenarios.forEach(({ arrange, description }) => {
    it(description, () => {
      arrange();

      const { container } = render(<NavBar dispatch={jest.fn()} />);

      expect(container).toMatchSnapshot();
    });
  });

  it('login', () => {
    const mockLoginWithRedirect = jest.fn();
    useAuth0.mockImplementation(() => ({
      isAuthenticated: false,
      loginWithRedirect: mockLoginWithRedirect
    }));

    const { getByTestId } = render(<NavBar dispatch={jest.fn()} />);
    fireEvent.click(getByTestId('login'));

    expect(mockLoginWithRedirect).toBeCalled();
  });

  it('logout', () => {
    const mockDispatch = jest.fn();
    const mockLogout = jest.fn();
    useAuth0.mockImplementation(() => ({
      isAuthenticated: true,
      logout: mockLogout,
      user
    }));

    const { getByTestId } = render(<NavBar dispatch={mockDispatch} />);
    fireEvent.click(getByTestId('logout'));

    expect(mockDispatch.mock.calls[0]).toMatchSnapshot();
    expect(mockLogout).toBeCalled();
  });
});
