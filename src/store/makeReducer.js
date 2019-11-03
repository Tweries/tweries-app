import makeInitialState from './makeInitialState';
import makeTweetstorm from './makeTweetstorm';

export const types = {
  CHANGE_HASHTAGS: 'CHANGE_HASHTAGS',
  CHANGE_LINEFEED: 'CHANGE_LINEFEED',
  CHANGE_SOURCE: 'CHANGE_SOURCE',
  DISMISS_TOAST: 'DISMISS_TOAST',
  RESET_TWEETSTORM: 'RESET_TWEETSTORM',
  SET_HEALTHY: 'SET_HEALTHY',
  SET_USER_ID: 'SET_USER_ID'
};

function makeReducer(feature) {
  function reducer(state = makeInitialState({ feature }), action) {
    switch (action.type) {
      case types.CHANGE_HASHTAGS: {
        return {
          ...state,
          hashtags: action.value,
          items: makeTweetstorm(feature)({
            hashtags: action.value,
            linefeed: state.linefeed,
            source: state.source
          })
        };
      }
      case types.CHANGE_LINEFEED: {
        return {
          ...state,
          items: makeTweetstorm(feature)({
            hashtags: state.hashtags,
            linefeed: action.value,
            source: state.source
          }),
          linefeed: action.value
        };
      }
      case types.CHANGE_SOURCE: {
        return {
          ...state,
          items: makeTweetstorm(feature)({
            hashtags: state.hashtags,
            linefeed: state.linefeed,
            source: action.value
          }),
          source: action.value
        };
      }
      case types.DISMISS_TOAST: {
        return {
          ...state,
          notification: null
        };
      }
      case types.RESET_TWEETSTORM: {
        return {
          ...makeInitialState({ feature }),
          healthy: state.healthy,
          notification: action.value,
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

  return reducer;
}

export default makeReducer;