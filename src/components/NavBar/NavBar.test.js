import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import NavBar from './NavBar';

const user = {
  name: 'tweries-app',
  picture:
    'https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png'
};

const mockLogout = jest.fn();

describe('NavBar', () => {
  afterEach(() => {
    mockLogout.mockReset();
  });

  const scenarios = [
    {
      act: (getByTestId) => {
        fireEvent.click(getByTestId('logout'));
      },
      assert: () => {
        expect(mockLogout).toBeCalled();
      },
      description: 'authenticated user',
      props: {
        logout: mockLogout,
        user
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
