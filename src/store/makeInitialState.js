import makeTweetstorm, { LINEFEED } from './makeTweetstorm';

function makeInitialState({
  feature,
  hashtags = '',
  linefeed = LINEFEED,
  source = ''
}) {
  return {
    feature,
    hashtags,
    healthy: false,
    items: makeTweetstorm({ feature, hashtags, linefeed, source }),
    linefeed,
    source,
    userId: null
  };
}

export default makeInitialState;
