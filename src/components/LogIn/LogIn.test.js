import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import LogIn from './LogIn';

describe('<LogIn />', () => {
  it('to match snapshot', () => {
    const { container } = render(<LogIn />);
    expect(container).toMatchSnapshot();
  });

  it('onClick', () => {
    const loginWithRedirect = jest.fn();

    const { getByTestId } = render(
      <LogIn loginWithRedirect={loginWithRedirect} />
    );

    fireEvent.click(getByTestId('login'));

    expect(loginWithRedirect).toBeCalled();
  });
});
