import v from 'voca';

export const LINEFEED = ';;';
const MAX_LENGTH = 280;
export const NEWLINE = '\n';
const PREFIX_PLACEHOLDER = '_/_';

function makeSequenceNumber(index, length) {
  if (index === undefined && length === undefined) {
    return PREFIX_PLACEHOLDER;
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

function makeTweetstorm({ hashtags, linefeed, source }) {
  // INFO: hack :(
  if (linefeed === null || linefeed === undefined || linefeed === '') {
    linefeed = LINEFEED;
  }

  let copy = replaceNewlinesWithNewline(linefeed, source);
  const parts = [];

  while (copy.length !== 0) {
    let take;
    if (hashtags.length > 0) {
      take = v.prune(
        copy,
        MAX_LENGTH - hashtags.length - makeSequenceNumber().length - 2, // INFO: 1 space before the hashtags and 1 space before the sequence number
        ''
      );
    } else {
      take = v.prune(
        copy,
        MAX_LENGTH - makeSequenceNumber().length - 1, // INFO: 1 space before the sequence number
        ''
      );
    }
    if (take.indexOf(linefeed) > -1) {
      take = v.substr(take, 0, take.indexOf(linefeed));
      copy = v.substr(copy, take.length + linefeed.length);
    } else {
      copy = v.substr(copy, take.length + 1); // INFO: 1 is the space after the word
    }
    parts.push(take);
  }

  const tweetstorm = parts.map((part, index) => {
    let tweet;
    if (hashtags.length > 0) {
      tweet = `${v.trim(part)} ${hashtags} ${makeSequenceNumber(
        index,
        parts.length
      )}`;
    } else {
      tweet = `${v.trim(part)} ${makeSequenceNumber(index, parts.length)}`;
    }

    return { length: tweet.length, tweet };
  });

  return tweetstorm;
}

export default makeTweetstorm;
