import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import ReplyToTweet from './ReplyToTweet';

const mockOnChangeId = jest.fn();
const mockOnChangeUrl = jest.fn();

const baseProps = {
  onChangeId: mockOnChangeId,
  onChangeUrl: mockOnChangeUrl,
  userId: null,
  value: ''
};

const TWEET_URL = 'https://twitter.com/musk_china/status/1199474666412236800';
const USER_ID = 'twitter|1183836409850814464';

describe('ReplyToTweet', () => {
  beforeEach(() => {
    mockOnChangeId.mockReset();
    mockOnChangeUrl.mockReset();
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
      userId: USER_ID,
      value: TWEET_URL
    };
    render(<ReplyToTweet {...props} />);

    // TODO: add assertion
  });

  it('bad URL', () => {
    fetch.mockResponseOnce(JSON.stringify({}));

    const props = {
      ...baseProps,
      userId: USER_ID,
      value: 'something'
    };
    render(<ReplyToTweet {...props} />);

    // TODO: add assertion
  });

  it('change URL', () => {
    fetch.mockResponseOnce(JSON.stringify({}));

    const props = {
      ...baseProps,
      userId: USER_ID,
      value: ''
    };
    const { getByTestId } = render(<ReplyToTweet {...props} />);

    fireEvent.change(getByTestId('reply-to'), {
      target: { value: TWEET_URL }
    });

    // TODO: add assertion
  });
});
