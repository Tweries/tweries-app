import v from 'voca';

function makePrefix(index, length) {
  if (index === undefined && length === undefined) {
    return '_/_'; // AKA: placeholder
  }
  return `${index + 1}/${length}`;
}

function makeTweetstorm(source, suffix) {
  let copy = source.slice();
  const MAX_LENGTH = 280;
  const parts = [];

  while (copy.length !== 0) {
    let take = v.prune(
      copy,
      MAX_LENGTH - makePrefix().length - suffix.length - 2, // INFO: 1 space after the prefix and one space before the suffix
      ''
    );
    if (take.indexOf('[..]') > -1) {
      take = v.substr(take, 0, take.indexOf('[..]'));
      copy = v.substr(copy, take.length + 4); // INFO: 4 is the lenght of the linefeed
    } else {
      copy = v.substr(copy, take.length + 1);
    }
    parts.push(take);
  }

  const tweetstorm = parts.map((part, index) => {
    const tweet = `${makePrefix(index, parts.length)} ${v.trim(
      part
    )} ${suffix}`;
    return { length: tweet.length, tweet };
  });

  return tweetstorm;
}

export default makeTweetstorm;
