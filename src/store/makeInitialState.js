import { NEWLINE } from '../constants';
import makeTweetstorm from './makeTweetstorm';

function makeInitialState({ feature }) {
  return {
    hashtags: '',
    healthy: false,
    items: makeTweetstorm(feature)({
      hashtags: '',
      linefeed: NEWLINE,
      source: ''
    }),
    linefeed: NEWLINE,
    notification: null,
    source: '',
    userId: ''
  };
}

export default makeInitialState;
