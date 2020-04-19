import { SUCCESS } from '../constants';
import makeInitialState from './makeInitialState';
import makeTweetstorm from './makeTweetstorm';

export const types = {
  APPEND_SCREEN_NAME: 'APPEND_SCREEN_NAME',
  CHANGE_SOURCE: 'CHANGE_SOURCE',
  CHANGE_TWEET: 'CHANGE_TWEET',
  DISMISS_TOAST: 'DISMISS_TOAST',
  RESET_TWEETSTORM: 'RESET_TWEETSTORM',
  SET_HEALTHY: 'SET_HEALTHY',
  SET_USER_ID: 'SET_USER_ID'
};

function makeReducer(feature) {
  function reducer(state = makeInitialState({ feature }), action) {
    switch (action.type) {
      case types.APPEND_SCREEN_NAME: {
        const source = `@${action.value} ${state.source}`;
        return {
          ...state,
          items: makeTweetstorm(feature)({
            linefeed: state.linefeed,
            source
          }),
          source
        };
      }
      case types.CHANGE_SOURCE: {
        return {
          ...state,
          items: makeTweetstorm(feature)({
            linefeed: state.linefeed,
            source: action.value
          }),
          source: action.value
        };
      }
      case types.CHANGE_TWEET: {
        return {
          ...state,
          items: [...state.items].map((item) => {
            const copy = { ...item };
            if (copy.id === action.value.id) {
              copy.tweet = action.value.tweet;
            }
            return copy;
          })
        };
      }
      case types.DISMISS_TOAST: {
        return {
          ...state,
          notification: null
        };
      }
      case types.RESET_TWEETSTORM: {
        if (action.value.type === SUCCESS) {
          return {
            ...makeInitialState({ feature }),
            healthy: state.healthy,
            notification: action.value,
            userId: state.userId
          };
        }
        return {
          ...state,
          notification: action.value
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
