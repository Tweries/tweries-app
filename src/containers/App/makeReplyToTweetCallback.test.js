import { types } from '../../store/makeReducer';
import makeReplyToTweetCallback from './makeReplyToTweetCallback';

describe('makeReplyToTweetCallback', () => {
  it('no data', () => {
    const mockDispatch = jest.fn();

    const replyToTweetCallback = makeReplyToTweetCallback({
      dispatch: mockDispatch
    });

    replyToTweetCallback();

    expect(mockDispatch).not.toBeCalled();
  });

  it('data', () => {
    const mockDispatch = jest.fn();

    const replyToTweetCallback = makeReplyToTweetCallback({
      dispatch: mockDispatch
    });

    const screenName = '@TweriesApp';

    replyToTweetCallback(null, { user: { screen_name: screenName } });

    expect(mockDispatch).toBeCalledWith({
      type: types.APPEND_SCREEN_NAME,
      value: screenName
    });
  });
});
