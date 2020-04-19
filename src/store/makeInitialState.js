import { NEWLINE } from '../constants';
import makeTweetstorm from './makeTweetstorm';

function makeInitialState({ feature }) {
  return {
    healthy: false,
    items: makeTweetstorm(feature)({
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
