import makeTweetstorm from './makeTweetstorm';

function makeInitialState(hashtags = '', source = '') {
  return {
    hashtags,
    healthy: false,
    items: makeTweetstorm(source, hashtags),
    source,
    userId: null
  };
}

export default makeInitialState;
