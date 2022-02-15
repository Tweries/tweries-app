import makeOnClick from './makeOnClick';

describe('makeOnClick', () => {
  it.skip('success', async () => {
    fetch.mockResponseOnce(
      JSON.stringify({
        data: {
          statusIds: [
            '1230233654959407104',
            '1230233655626301442',
            '1230233656658157573'
          ],
          userId: 'twitter|1183836409850814464'
        }
      })
    );

    const mockDispatch = jest.fn();
    const mockSetInReplyToTweetUrl = jest.fn();
    const mockSetSource = jest.fn();
    const mockSetWaiting = jest.fn();

    const onClick = makeOnClick({
      dispatch: mockDispatch,
      setInReplyToTweetUrl: mockSetInReplyToTweetUrl,
      setSource: mockSetSource,
      setWaiting: mockSetWaiting
    });

    await onClick();

    expect(mockDispatch).toBeCalled();
    expect(mockSetInReplyToTweetUrl).toBeCalled();
    expect(mockSetSource).toBeCalled();
    expect(mockSetWaiting).toBeCalled();
  });

  it('danger', async () => {
    fetch.mockResponseOnce(
      JSON.stringify({
        error: {
          message: 'Oh Noes!'
        }
      })
    );

    const mockDispatch = jest.fn();
    const mockSetInReplyToTweetUrl = jest.fn();
    const mockSetSource = jest.fn();
    const mockSetWaiting = jest.fn();

    const onClick = makeOnClick({
      dispatch: mockDispatch,
      setInReplyToTweetUrl: mockSetInReplyToTweetUrl,
      setSource: mockSetSource,
      setWaiting: mockSetWaiting
    });

    await onClick();

    expect(mockDispatch).toBeCalled();
    expect(mockSetInReplyToTweetUrl).not.toBeCalled();
    expect(mockSetSource).not.toBeCalled();
    expect(mockSetWaiting).toBeCalled();
  });

  it('error', async () => {
    fetch.mockResponseOnce('');

    const mockDispatch = jest.fn();
    const mockSetInReplyToTweetUrl = jest.fn();
    const mockSetSource = jest.fn();
    const mockSetWaiting = jest.fn();

    const onClick = makeOnClick({
      dispatch: mockDispatch,
      setInReplyToTweetUrl: mockSetInReplyToTweetUrl,
      setSource: mockSetSource,
      setWaiting: mockSetWaiting
    });

    await onClick();

    expect(mockDispatch).toBeCalled();
    expect(mockSetInReplyToTweetUrl).not.toBeCalled();
    expect(mockSetSource).not.toBeCalled();
    expect(mockSetWaiting).toBeCalled();
  });
});
