import v from 'voca';

const LINEFEED = '[..]';
const MAX_LENGTH = 280;
const PREFIX_PLACEHOLDER = '_/_';

function makeSequenceNumber(index, length) {
  if (index === undefined && length === undefined) {
    return PREFIX_PLACEHOLDER;
  }
  return `${index + 1}/${length}`;
}

function makeTweetstorm(source, hashtags) {
  let copy = source.slice();
  const parts = [];

  while (copy.length !== 0) {
    let take = v.prune(
      copy,
      MAX_LENGTH - makeSequenceNumber().length - hashtags.length - 2, // INFO: 1 space after the prefix and one space before the suffix
      ''
    );
    if (take.indexOf(LINEFEED) > -1) {
      take = v.substr(take, 0, take.indexOf(LINEFEED));
      copy = v.substr(copy, take.length + 4); // INFO: 4 is the lenght of the linefeed
    } else {
      copy = v.substr(copy, take.length + 1); // INFO: 1 is the space after the word
    }
    parts.push(take);
  }

  const tweetstorm = parts.map((part, index) => {
    const tweet = `${v.trim(part)} ${hashtags} ${makeSequenceNumber(
      index,
      parts.length
    )}`;
    return { length: tweet.length, tweet };
  });

  return tweetstorm;
}

export default makeTweetstorm;
