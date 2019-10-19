import makeInitialState from './makeInitialState';
import makeTweetstorm from './makeTweetstorm';

export const types = {
  CHANGE_HASHTAGS: 'CHANGE_HASHTAGS',
  CHANGE_SOURCE: 'CHANGE_SOURCE',
  RESET_TWEETSTORM: 'RESET_TWEETSTORM',
  SET_HEALTHY: 'SET_HEALTHY',
  SET_USER_ID: 'SET_USER_ID'
};

function reducer(state = makeInitialState('', ''), action) {
  switch (action.type) {
    case types.CHANGE_HASHTAGS: {
      return {
        ...state,
        hashtags: action.value,
        items: makeTweetstorm(state.source, action.value)
      };
    }
    case types.CHANGE_SOURCE: {
      return {
        ...state,
        items: makeTweetstorm(action.value, state.hashtags),
        source: action.value
      };
    }
    case types.RESET_TWEETSTORM: {
      return {
        ...makeInitialState(),
        healthy: state.healthy,
        userId: state.userId
      };
    }
    case types.SET_HEALTHY: {
      return {
        ...state,
        healthy: action.value
      };
    }
    case types.SET_USER_ID: {
      return {
        ...state,
        userId: action.value
      };
    }
    default:
      return state;
  }
}

export default reducer;
