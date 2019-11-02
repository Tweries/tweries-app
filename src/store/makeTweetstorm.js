import v from 'voca';
import {
  EMPTY_FIRST_SEQUENCE_NUMBER_V1,
  LINEFEED,
  NEWLINE,
  SPACE_AFTER_PUNCTUATION_V1
} from '../constants';

const MAX_LENGTH = 280;
const SEQUENCE_NUMBER_PLACEHOLDER = '_/_';

function hasSpaceAfterPunctuation(feature, index, take) {
  if (feature.active(SPACE_AFTER_PUNCTUATION_V1)) {
    // INFO: index + 1 is the character after the punctuation
    return v.substr(take, index + 1, 1) === ' ';
  }
  return true;
}

function backUpToLastPunctuation(feature, take) {
  const punctuations = ['-', '–', '.', ',', ';', '!', '?'];
  const data = punctuations
    .map(punctuation => ({
      key: punctuation,
      value: v.lastIndexOf(take, punctuation)
    }))
    .sort((a, b) => {
      if (a.value > b.value) {
        return -1;
      }
      if (a.value < b.value) {
        return 1;
      }
      return 0;
    })[0];
  if (
    data.value !== -1 &&
    hasSpaceAfterPunctuation(feature, data.value, take)
  ) {
    take = v.substr(take, 0, data.value + 1);
  }
  return take;
}

function makeSequenceNumber({ feature, index, length }) {
  if (index === undefined && length === undefined) {
    return SEQUENCE_NUMBER_PLACEHOLDER;
  }
  if (
    feature.active(EMPTY_FIRST_SEQUENCE_NUMBER_V1) &&
    index === 0 &&
    length === 1
  ) {
    return '';
  }
  return `${index + 1}/${length}`;
}

function replaceNewlinesWithNewline(linefeed, source) {
  let copy = source.slice();
  if (linefeed === NEWLINE) {
    copy = copy.replace(/\n+/g, NEWLINE);
  }
  return copy;
}

function makeTweetstorm({ feature, hashtags, linefeed, source }) {
  // INFO: hack :(
  if (linefeed === null || linefeed === undefined || linefeed === '') {
    linefeed = LINEFEED;
  }

  let copy = replaceNewlinesWithNewline(linefeed, source);
  const parts = [];

  while (copy.length !== 0) {
    let take;
    let max;
    if (hashtags.length > 0) {
      max =
        MAX_LENGTH -
        hashtags.length -
        makeSequenceNumber({ feature }).length -
        2; // INFO: 1 space before the hashtags and 1 space before the sequence number
    } else {
      max = MAX_LENGTH - makeSequenceNumber({ feature }).length - 1; // INFO: 1 space before the sequence number
    }
    take = v.prune(copy, max, '');
    if (take.indexOf(linefeed) !== -1) {
      take = v.substr(take, 0, take.indexOf(linefeed));
      copy = v.substr(copy, take.length + linefeed.length);
    } else {
      take = backUpToLastPunctuation(feature, take);
      copy = v.substr(copy, take.length + 1); // INFO: 1 is the space after the word
    }
    parts.push(take);
  }

  const tweetstorm = parts.map((part, index) => {
    let tweet;
    if (hashtags.length > 0) {
      tweet = `${v.trim(part)} ${hashtags} ${makeSequenceNumber({
        feature,
        index,
        length: parts.length
      })}`;
    } else {
      tweet = `${v.trim(part)} ${makeSequenceNumber({
        feature,
        index,
        length: parts.length
      })}`;
    }

    return { length: tweet.length, tweet };
  });

  return tweetstorm;
}

export default makeTweetstorm;
