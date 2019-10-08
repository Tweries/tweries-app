import v from 'voca';

function makePrefix(index, length) {
  if (index === undefined && length === undefined) {
    return '_/_'; // AKA: placeholder
  }
  return `${index + 1}/${length}`;
}

describe('source => tweetstorm', () => {
  const scenarios = [
    {
      description: 'Lorem ipsum',
      source:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nec tincidunt praesent semper feugiat nibh sed pulvinar. Duis at tellus at urna condimentum mattis pellentesque id nibh. Quisque egestas diam in arcu cursus euismod quis viverra. Mollis nunc sed id semper risus. Aliquet eget sit amet tellus cras adipiscing enim. Pellentesque dignissim enim sit amet venenatis urna cursus eget. Tortor consequat id porta nibh venenatis cras. Sagittis nisl rhoncus mattis rhoncus urna neque viverra justo nec. Egestas egestas fringilla phasellus faucibus. Nulla facilisi etiam dignissim diam quis enim. Maecenas ultricies mi eget mauris pharetra. Ac turpis egestas sed tempus urna et pharetra pharetra. Sagittis nisl rhoncus mattis rhoncus. Purus in mollis nunc sed id semper risus in. Nisl tincidunt eget nullam non nisi est sit amet. Condimentum vitae sapien pellentesque habitant morbi tristique. Integer quis auctor elit sed vulputate mi sit amet mauris. Orci dapibus ultrices in iaculis nunc. Rhoncus est pellentesque elit ullamcorper. Ullamcorper malesuada proin libero nunc consequat interdum varius. Sit amet nisl suscipit adipiscing bibendum est ultricies integer quis.',
      suffix: '#agile #prodmgmt'
    },
    {
      description: 'About the Windsor knot',
      source:
        'Although the Duke of Windsor never specifically used the Windsor knot, he did favor a wide triangular knot. In actuality, the Duke achieved his trendsetting look by tying a Four-in-Hand with specially made wide and extra thick ties. The Windsor knot was invented by the public as a way to imitate the Duke\'s knot style. There are several derivatives of the Windsor that are all referred to by the same name. The Windsor delivers a symmetrical and solid triangular knot that works best with a spread collar. This knot is also mistakenly referred to as the "Double Windsor" knot.',
      suffix: '#howto #tieatie'
    }
  ];

  scenarios.forEach(({ description, source, suffix }) => {
    test(description, () => {
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

      expect(tweetstorm).toMatchSnapshot();
    });
  });
});
