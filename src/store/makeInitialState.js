import makeTweetstorm, { LINEFEED } from './makeTweetstorm';

function makeInitialState({ hashtags = '', linefeed = LINEFEED, source = '' }) {
  return {
    hashtags,
    healthy: false,
    items: makeTweetstorm({ hashtags, linefeed, source }),
    linefeed,
    source,
    userId: null
  };
}

export default makeInitialState;
