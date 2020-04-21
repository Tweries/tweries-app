import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import TweetstormButton from './TweetstormButton';

describe('<TweetstormButton />', () => {
  it('disabled', () => {
    const { getByTestId } = render(<TweetstormButton disabled />);

    expect(getByTestId('tweet')).toMatchSnapshot();
  });

  it('enabled', () => {
    const { getByTestId } = render(<TweetstormButton disabled={false} />);

    expect(getByTestId('tweet')).toMatchSnapshot();
  });

  it('waiting', () => {
    const { getByTestId } = render(
      <TweetstormButton disabled={false} waiting />
    );

    expect(getByTestId('tweet')).toMatchSnapshot();
  });

  it('onClick', () => {
    const onClick = jest.fn();

    const { getByTestId } = render(
      <TweetstormButton disabled={false} onClick={onClick} />
    );

    fireEvent.click(getByTestId('tweet'));

    expect(onClick).toBeCalled();
  });
});
