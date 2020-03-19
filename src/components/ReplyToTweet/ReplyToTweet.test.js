import { render, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import ReplyToTweet from './ReplyToTweet';

const mockCallback = jest.fn();
const mockOnChange = jest.fn();

const REPLY_TO = 'reply-to';
const TWEET_URL = 'https://twitter.com/musk_china/status/1199474666412236800';

const baseProps = {
  callback: mockCallback,
  onChange: mockOnChange,
  tweetUrl: '',
  userId: 'twitter|1183836409850814464'
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

  it('good URL', async () => {
    fetch.mockResponseOnce(
      JSON.stringify({ data: { statusId: '1199474666412236800' } })
    );
    const props = { ...baseProps, tweetUrl: TWEET_URL };

    const { getByTestId } = render(<ReplyToTweet {...props} />);
    await waitFor(() => getByTestId(REPLY_TO));

    expect(mockCallback).toBeCalled();
  });

  it('bad URL', async () => {
    fetch.mockResponseOnce(JSON.stringify({ error: { message: 'Oh Noes!' } }));
    const props = { ...baseProps, tweetUrl: 'something' };

    const { getByTestId } = render(<ReplyToTweet {...props} />);
    await waitFor(() => getByTestId(REPLY_TO));

    expect(mockCallback).toBeCalled();

    fireEvent.change(getByTestId(REPLY_TO), { target: { value: TWEET_URL } });

    expect(mockOnChange).toBeCalled();
  });

  it('error', async () => {
    fetch.mockRejectOnce(new Error('Oh Noes!'));
    const props = { ...baseProps, tweetUrl: TWEET_URL };

    const { getByTestId } = render(<ReplyToTweet {...props} />);
    await waitFor(() => getByTestId(REPLY_TO));

    expect(mockCallback).toBeCalled();
  });
});
