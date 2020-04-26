import fetchTweetstorm from '../../api/fetchTweetstorm';
import { DANGER, SUCCESS } from '../../constants';
import { types } from '../../store/makeReducer';
import makeLink from './makeLink';

function makeOnClick({
  dispatch,
  inReplyToTweetUrl,
  items,
  setInReplyToTweetUrl,
  setSource,
  setWaiting,
  userId
}) {
  function resetTweetstorm(error, response) {
    let link = null;
    let message = null;
    let type = SUCCESS;
    if (error || response.error) {
      message = error ? error.message : response.error.message;
      type = DANGER;
    } else {
      link = makeLink(response.data);
    }
    console.log(error, response);
    dispatch({
      type: types.RESET_TWEETSTORM,
      value: {
        link,
        message,
        type
      }
    });
    if (type === SUCCESS) {
      setInReplyToTweetUrl('');
      setSource('');
    }
    setWaiting(false);
  }

  async function onClick() {
    setWaiting(true);
    try {
      const response = await fetchTweetstorm({
        inReplyToTweetUrl,
        items,
        userId
      });
      resetTweetstorm(null, response);
    } catch (error) {
      resetTweetstorm(error);
    }
  }

  return onClick;
}

export default makeOnClick;
