import React from 'react';
import App from './App';
import { render } from '@testing-library/react';

describe('App', () => {
  it('to match snapshot', () => {
    const { container } = render(<App />);
    expect(container).toMatchSnapshot();
  });
});
