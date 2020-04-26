import { types } from '../../store/makeReducer';

function makeReplyToTweetCallback({ dispatch }) {
  function replyToTweetCallback(error, data) {
    if (data) {
      dispatch({
        type: types.APPEND_SCREEN_NAME,
        value: data.user.screen_name
      });
    }
  }

  return replyToTweetCallback;
}

export default makeReplyToTweetCallback;
