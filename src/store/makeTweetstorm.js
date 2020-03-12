import v from 'voca';
import { MAX_LENGTH, NEWLINE } from '../constants';

const SEQUENCE_NUMBER_PLACEHOLDER = '_/_';

// CREDIT: https://gist.github.com/gordonbrander/2230317
function generateUniqueId() {
  return `_${Math.random()
    .toString(36)
    .substr(2, 9)}`;
}

function makeTweetstorm(feature) {
  function hasSpaceAfterPunctuation(index, take) {
    // INFO: index + 1 is the character after the punctuation
    return v.substr(take, index + 1, 1) === ' ';
  }

  function endOfSource(copy, take) {
    return copy === take;
  }

  function backUpToLastPunctuation(copy, take) {
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
      hasSpaceAfterPunctuation(data.value, take) &&
      !endOfSource(copy, take)
    ) {
      return v.substr(take, 0, data.value + 1);
    }
    return take;
  }

  function makeSequenceNumber(index, length) {
    if (index === undefined && length === undefined) {
      return ` ${SEQUENCE_NUMBER_PLACEHOLDER}`;
    }
    if (index === 0 && length === 1) {
      return '';
    }
    return ` ${index + 1}/${length}`;
  }

  function replaceNewlinesWithNewline(linefeed, source) {
    let copy = source.slice();
    if (linefeed === NEWLINE) {
      copy = copy.replace(/\n+/g, NEWLINE);
    }
    return copy;
  }

  function getGoodLineFeed(linefeed) {
    // INFO: hack :(
    if (linefeed === null || linefeed === undefined || linefeed === '') {
      return NEWLINE;
    }
    return linefeed;
  }

  function tweetstorm({ hashtags, linefeed, source }) {
    const goodLinefeed = getGoodLineFeed(linefeed);

    let copy = replaceNewlinesWithNewline(goodLinefeed, source);
    const parts = [];

    while (copy.length !== 0) {
      let take;
      let max;
      if (hashtags.length > 0) {
        max = MAX_LENGTH - hashtags.length - 1 - makeSequenceNumber().length; // INFO: 1 space before the hashtags
      } else {
        max = MAX_LENGTH - makeSequenceNumber().length; // INFO: 1 space before the sequence number
      }
      take = v.prune(copy, max, '');
      if (take.indexOf(goodLinefeed) !== -1) {
        take = v.substr(take, 0, take.indexOf(goodLinefeed));
        copy = v.substr(copy, take.length + goodLinefeed.length);
      } else {
        take = backUpToLastPunctuation(copy, take);
        copy = v.substr(copy, take.length + 1); // INFO: 1 is the space after the word
      }
      parts.push(take);
    }

    const tweets = parts.map((part, index) => {
      let tweet;
      const sequenceNumber = makeSequenceNumber(index, parts.length);
      if (hashtags.length > 0) {
        tweet = `${v.trim(part)} ${hashtags}${sequenceNumber}`;
      } else {
        tweet = `${v.trim(part)}${sequenceNumber}`;
      }

      return { id: generateUniqueId(), tweet };
    });

    return tweets;
  }

  return tweetstorm;
}

export default makeTweetstorm;
