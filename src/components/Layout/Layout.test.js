import { render } from '@testing-library/react';
import React from 'react';
import { useAuth0 } from '../../react-auth0-wrapper';
import Layout from './Layout';

jest.mock('../../react-auth0-wrapper');

describe('Layout', () => {
  it('to match snapshot', () => {
    useAuth0.mockImplementation(() => ({}));

    const { container } = render(<Layout />);

    expect(container).toMatchSnapshot();
  });

  it('loading', () => {
    useAuth0.mockImplementation(() => ({ loading: true }));

    const { container } = render(<Layout />);

    expect(container).toMatchSnapshot();
  });
});
