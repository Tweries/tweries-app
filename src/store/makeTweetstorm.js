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
    const take = v.prune(
      copy,
      MAX_LENGTH - makePrefix().length - suffix.length - 2, // INFO: 1 space after the prefix and one space before the suffix
      ''
    );
    parts.push(take);
    copy = v.substr(copy, take.length + 1);
  }

  const tweetstorm = parts.map((part, index) => {
    expect(part).toEqual(v.trim(part)); // INFO: to make sure that part does not contain whitespace from both sides
    const tweet = `${makePrefix(index, parts.length)} ${part} ${suffix}`;
    return { length: tweet.length, tweet };
  });

  return tweetstorm;
}

export default makeTweetstorm;
