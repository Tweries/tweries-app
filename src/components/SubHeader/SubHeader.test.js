import { render } from '@testing-library/react';
import React from 'react';
import SubHeader from './SubHeader';

describe('<SubHeader />', () => {
  it('to match snapshot', () => {
    const { container } = render(<SubHeader />);
    expect(container).toMatchSnapshot();
  });
});
