import { types } from '../../store/makeReducer';

function makeOnChangeTweet({ dispatch }) {
  function onChangeTweet(e, item) {
    dispatch({
      type: types.CHANGE_TWEET,
      value: {
        id: item.id,
        tweet: e.target.value
      }
    });
  }

  return onChangeTweet;
}

export default makeOnChangeTweet;
