import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import ReplyToTweet from '../ReplyToTweet/ReplyToTweet';
import TweetstormButton from '../TweetstormButton/TweetstormButton';
import Form from './Form';

jest.mock('../../components/ReplyToTweet/ReplyToTweet');
jest.mock('../../components/TweetstormButton/TweetstormButton');

describe('<Form />', () => {
  beforeEach(() => {
    ReplyToTweet.mockImplementation(() => <div>ReplyToTweet</div>);
    TweetstormButton.mockImplementation(() => <div>TweetstormButton</div>);
  });

  it('to match snapshot', () => {
    const { container } = render(<Form healthy items={[]} source="" />);
    expect(container).toMatchSnapshot();
  });

  it('onChangeSource', () => {
    const onChangeSource = jest.fn();

    const { getByTestId } = render(
      <Form healthy items={[]} onChangeSource={onChangeSource} source="" />
    );

    fireEvent.change(getByTestId('source'), {
      target: { value: 'Surely crypto must be able to save us, no?' }
    });

    expect(onChangeSource).toBeCalled();
  });

  it('onChangeTweet', () => {
    const onChangeTweet = jest.fn();

    const { getByTestId } = render(
      <Form
        healthy
        items={[
          {
            id: '_mno97ls38',
            tweet: 'Surely crypto must be able to save us, no?'
          }
        ]}
        onChangeTweet={onChangeTweet}
        source="Surely crypto must be able to save us, no?"
      />
    );

    fireEvent.change(getByTestId('textarea'), {
      target: { value: 'Surely crypto must be able to save us, yes?' }
    });

    expect(onChangeTweet).toBeCalled();
  });
});
