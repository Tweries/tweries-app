import initialState from './initialState';
import makeTweetstorm from './makeTweetstorm';

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'CHANGE_HASHTAGS': {
      return {
        ...state,
        hashtags: action.value,
        items: makeTweetstorm(state.source, action.value)
      };
    }
    case 'CHANGE_SOURCE': {
      return {
        ...state,
        items: makeTweetstorm(action.value, state.hashtags),
        source: action.value
      };
    }
    case 'RESET_TWEETSTORM': {
      return {
        ...state,
        items: []
      };
    }
    case 'SET_HEALTHY': {
      return {
        ...state,
        healthy: action.value
      };
    }
    case 'SET_USER_ID': {
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
