import { types } from '../../store/makeReducer';
import makeOnChangeTweet from './makeOnChangeTweet';

describe('makeOnChangeTweet', () => {
  it('onChangeTweet', () => {
    const mockDispatch = jest.fn();

    const onChangeTweet = makeOnChangeTweet({
      dispatch: mockDispatch
    });
    const value = 'HELLO!';
    const id = '_hnoyohthb';

    onChangeTweet({ target: { value } }, { id });

    expect(mockDispatch).toBeCalledWith({
      type: types.CHANGE_TWEET,
      value: {
        id,
        tweet: value
      }
    });
  });
});
