import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import ReplyToTweet from './ReplyToTweet';

const mockCallback = jest.fn();
const mockOnChange = jest.fn();

const TWEET_URL = 'https://twitter.com/musk_china/status/1199474666412236800';
const USER_ID = 'twitter|1183836409850814464';

const baseProps = {
  callback: mockCallback,
  onChange: mockOnChange,
  tweetUrl: '',
  userId: USER_ID
};

describe('ReplyToTweet', () => {
  beforeEach(() => {
    mockCallback.mockReset();
    mockOnChange.mockReset();
  });

  it('to match snapshot', () => {
    const props = { ...baseProps };
    const { container } = render(<ReplyToTweet {...props} />);

    expect(container).toMatchSnapshot();
  });

  it('good URL', () => {
    fetch.mockResponseOnce(JSON.stringify({ statusId: '1199474666412236800' }));

    const props = {
      ...baseProps,
      value: TWEET_URL
    };
    render(<ReplyToTweet {...props} />);

    // TODO: add assertion
  });

  it('bad URL', () => {
    fetch.mockResponseOnce(JSON.stringify({}));

    const props = {
      ...baseProps,
      value: 'something'
    };
    render(<ReplyToTweet {...props} />);

    // TODO: add assertion
  });

  it('change URL', () => {
    fetch.mockResponseOnce(JSON.stringify({}));

    const props = {
      ...baseProps,
      value: ''
    };
    const { getByTestId } = render(<ReplyToTweet {...props} />);

    fireEvent.change(getByTestId('reply-to'), {
      target: { value: TWEET_URL }
    });

    // TODO: add assertion
  });
});
