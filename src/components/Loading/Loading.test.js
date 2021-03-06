import { render } from '@testing-library/react';
import React from 'react';
import Loading from './Loading';

describe('<Loading />', () => {
  it('to match snapshot', () => {
    const { getByText } = render(<Loading />);
    expect(getByText('...')).toBeInTheDocument();
  });
});
