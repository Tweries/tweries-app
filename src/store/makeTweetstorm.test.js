import makeTweetstorm from './makeTweetstorm';

describe('source => tweetstorm', () => {
  const scenarios = [
    {
      description: 'Lorem ipsum',
      props: {
        hashtags: '#agile #prodmgmt',
        source:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nec tincidunt praesent semper feugiat nibh sed pulvinar. Duis at tellus at urna condimentum mattis pellentesque id nibh. Quisque egestas diam in arcu cursus euismod quis viverra. Mollis nunc sed id semper risus. Aliquet eget sit amet tellus cras adipiscing enim. Pellentesque dignissim enim sit amet venenatis urna cursus eget. Tortor consequat id porta nibh venenatis cras. Sagittis nisl rhoncus mattis rhoncus urna neque viverra justo nec. Egestas egestas fringilla phasellus faucibus. Nulla facilisi etiam dignissim diam quis enim. Maecenas ultricies mi eget mauris pharetra. Ac turpis egestas sed tempus urna et pharetra pharetra. Sagittis nisl rhoncus mattis rhoncus. Purus in mollis nunc sed id semper risus in. Nisl tincidunt eget nullam non nisi est sit amet. Condimentum vitae sapien pellentesque habitant morbi tristique. Integer quis auctor elit sed vulputate mi sit amet mauris. Orci dapibus ultrices in iaculis nunc. Rhoncus est pellentesque elit ullamcorper. Ullamcorper malesuada proin libero nunc consequat interdum varius. Sit amet nisl suscipit adipiscing bibendum est ultricies integer quis.'
      }
    },
    {
      description: 'About the Windsor knot',
      props: {
        hashtags: '#howto #tieatie',
        source:
          'Although the Duke of Windsor never specifically used the Windsor knot, he did favor a wide triangular knot. In actuality, the Duke achieved his trendsetting look by tying a Four-in-Hand with specially made wide and extra thick ties. The Windsor knot was invented by the public as a way to imitate the Duke\'s knot style. There are several derivatives of the Windsor that are all referred to by the same name. The Windsor delivers a symmetrical and solid triangular knot that works best with a spread collar. This knot is also mistakenly referred to as the "Double Windsor" knot.'
      }
    },
    {
      description: 'w/ linefeeds',
      props: {
        hashtags: '#QueenFTW',
        source: `Mama, just killed a man
        Put a gun against his head
        Pulled my trigger, now he's dead
        Mama, life had just begun
        But now I've gone and thrown it all away
        [..]
        Mama, ooh
        Didn't mean to make you cry
        If I'm not back again this time tomorrow
        Carry on, carry on
        As if nothing really matters
        [..]
        Too late, my time has come
        Sends shivers down my spine
        Body's aching all the time
        Goodbye everybody, I've got to go
        Gotta leave you all behind and face the truth`
      }
    },
    {
      description: 'No final comma in the 1st tweet',
      props: {
        hashtags: '',
        source:
          '123456789, 123456789, 123456789, 123456789, 123456789, 123456789, 123456789, 123456789, 123456789, 123456789, 123456789, 123456789, 123456789, 123456789, 123456789, 123456789, 123456789, 123456789, 123456789, 123456789, 123456789, 123456789, 123456789, 123456789, 123456789, WHAT?'
      }
    },
    {
      description: 'pick-your-own-linefeed',
      props: {
        hashtags: '',
        linefeed: ';;',
        source: 'first ;; second ;; third ;; fourth'
      }
    }
  ];

  scenarios.forEach(({ description, props }) => {
    test(description, () => {
      const tweetstorm = makeTweetstorm(props);
      expect(tweetstorm).toMatchSnapshot();
    });
  });
});
