import { render } from '@testing-library/react';
import React from 'react';
import Footer from './Footer';

describe('Footer', () => {
  it('to match snapshot', () => {
    const { container } = render(
      <Footer healthy={true} version="1.0.0-beta.1" />
    );
    expect(container).toMatchSnapshot();
  });
});
