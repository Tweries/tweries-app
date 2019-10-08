import initialState from './initialState';
import makeTweetstorm from './makeTweetstorm';

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'CHANGE_HASHTAGS': {
      return {
        ...state,
        hashtags: action.value
      };
    }
    case 'CHANGE_SOURCE': {
      return {
        ...state,
        source: action.value
      };
    }
    case 'GENERATE_TWEETSTORM': {
      return {
        ...state,
        items: makeTweetstorm(state.source, state.hashtags)
      };
    }
    default:
      return state;
  }
}

export default reducer;
