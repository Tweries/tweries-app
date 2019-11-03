import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import NavBar from './NavBar';

const user = {
  name: 'tweries-app',
  picture:
    'https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png',
  sub: 'twitter|1183836409850814464'
};

const mockLoginWithRedirect = jest.fn();
const mockLogout = jest.fn();

describe('NavBar', () => {
  afterEach(() => {
    mockLoginWithRedirect.mockReset();
    mockLogout.mockReset();
  });

  const scenarios = [
    {
      act: getByTestId => {
        fireEvent.click(getByTestId('logout'));
      },
      assert: () => {
        expect(mockLogout).toBeCalled();
      },
      description: 'authenticated user',
      props: {
        isAuthenticated: true,
        logout: mockLogout,
        user
      }
    },
    {
      act: getByTestId => {
        fireEvent.click(getByTestId('login'));
      },
      assert: () => {
        expect(mockLoginWithRedirect).toBeCalled();
      },
      description: 'unauthenticated user',
      props: {
        isAuthenticated: false,
        loginWithRedirect: mockLoginWithRedirect
      }
    }
  ];

  scenarios.forEach(({ act, assert, description, props }) => {
    it(description, () => {
      const { getByTestId } = render(<NavBar {...props} />);
      act(getByTestId);
      assert();
    });
  });
});
