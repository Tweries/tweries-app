import makeTweetstorm from './makeTweetstorm';

describe('makeTweetstorm', () => {
  const scenarios = [
    {
      description: 'Lorem ipsum',
      props: {
        source:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nec tincidunt praesent semper feugiat nibh sed pulvinar. Duis at tellus at urna condimentum mattis pellentesque id nibh. Quisque egestas diam in arcu cursus euismod quis viverra. Mollis nunc sed id semper risus. Aliquet eget sit amet tellus cras adipiscing enim. Pellentesque dignissim enim sit amet venenatis urna cursus eget. Tortor consequat id porta nibh venenatis cras. Sagittis nisl rhoncus mattis rhoncus urna neque viverra justo nec. Egestas egestas fringilla phasellus faucibus. Nulla facilisi etiam dignissim diam quis enim. Maecenas ultricies mi eget mauris pharetra. Ac turpis egestas sed tempus urna et pharetra pharetra. Sagittis nisl rhoncus mattis rhoncus. Purus in mollis nunc sed id semper risus in. Nisl tincidunt eget nullam non nisi est sit amet. Condimentum vitae sapien pellentesque habitant morbi tristique. Integer quis auctor elit sed vulputate mi sit amet mauris. Orci dapibus ultrices in iaculis nunc. Rhoncus est pellentesque elit ullamcorper. Ullamcorper malesuada proin libero nunc consequat interdum varius. Sit amet nisl suscipit adipiscing bibendum est ultricies integer quis.'
      }
    },
    {
      description: 'About the Windsor knot',
      props: {
        source:
          'Although the Duke of Windsor never specifically used the Windsor knot, he did favor a wide triangular knot. In actuality, the Duke achieved his trendsetting look by tying a Four-in-Hand with specially made wide and extra thick ties. The Windsor knot was invented by the public as a way to imitate the Duke\'s knot style. There are several derivatives of the Windsor that are all referred to by the same name. The Windsor delivers a symmetrical and solid triangular knot that works best with a spread collar. This knot is also mistakenly referred to as the "Double Windsor" knot.'
      }
    },
    {
      description: 'w/ linefeeds',
      props: {
        linefeed: '[..]',
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
        source:
          '123456789, 123456789, 123456789, 123456789, 123456789, 123456789, 123456789, 123456789, 123456789, 123456789, 123456789, 123456789, 123456789, 123456789, 123456789, 123456789, 123456789, 123456789, 123456789, 123456789, 123456789, 123456789, 123456789, 123456789, 123456789, WHAT?'
      }
    },
    {
      description: 'pick-your-own-linefeed',
      props: {
        linefeed: ';;',
        source: 'first ;; second ;; third ;; fourth'
      }
    },
    {
      description: 'empty linefeed',
      props: {
        linefeed: '',
        source:
          'It put a huge amount of stress on me. Resentment built up and I delegated less and less. With so much on my plate, I was running the risk of burnout, and as my team saw this spiral, they became demotivated and the vicious spiral continued.'
      }
    },
    {
      description: 'new lines',
      props: {
        source: `In many real world uses of the javascript code it's probably better to replace the line breaks with a space instead of just removing them entirely.

        If for instance we got a column of text from a pdf and we just removed the line breaks entirely we might wind up with words and sentences that run together and are hard to read like this:
        Here is a sentence.This sentence runs into itand unfortunately we aremissing some spaces.`
      }
    },
    {
      description: 'text without line breaks',
      props: {
        source:
          'Nel mezzo del cammin di nostra vita mi ritrovai per una selva oscura, ché la diritta via era smarrita. Ahi quanto a dir qual era è cosa dura esta selva selvaggia e aspra e forte che nel pensier rinova la paura! Tant’ è amara che poco è più morte; ma per trattar del ben ch’i’ vi trovai, dirò de l’altre cose ch’i’ v’ho scorte. Io non so ben ridir com’ i’ v’intrai,10 tant’ era pien di sonno a quel punto che la verace via abbandonai. Ma poi ch’i’ fui al piè d’un colle giunto, là dove terminava quella valle che m’avea di paura il cor compunto, guardai in alto e vidi le sue spalle vestite già de’ raggi del pianeta che mena dritto altrui per ogne calle. Allor fu la paura un poco queta, che nel lago del cor m’era durata20 la notte ch’i’ passai con tanta pieta. E come quei che con lena affannata, uscito fuor del pelago a la riva, si volge a l’acqua perigliosa e guata, così l’animo mio, ch’ancor fuggiva, si volse a retro a rimirar lo passo che non lasciò già mai persona viva.'
      }
    },
    {
      description: 'w/ an URL',
      props: {
        source:
          'https://marker.medium.com/how-to-hold-your-team-accountable-9fa57bfb315d'
      }
    },
    {
      description: 'no 1/1',
      props: {
        source: `If your company is producing software too slowly, hiring more "programming talent" will probably not speed you up in any significant way. Instead, remove waste from your existing system. It's way more cost effective. Adding people makes sense only if there's no waste.`
      }
    },
    {
      description: 'odd bug in the splitting algorithm w/o full stop',
      props: {
        source: `A massive shared database is nothing but a massive global variable, and it's no better architecturally than any other global variable (worse, in fact, because of its size). Shared databases are something to be avoided, just like any other global.
        Instead, think of microservices, where each service literally has its own database`
      }
    },
    {
      description: 'odd bug in the splitting algorithm w/ full stop',
      props: {
        source: `A massive shared database is nothing but a massive global variable, and it's no better architecturally than any other global variable (worse, in fact, because of its size). Shared databases are something to be avoided, just like any other global.
        Instead, think of microservices, where each service literally has its own database.`
      }
    }
  ];

  scenarios.forEach(({ activeFeature, description, props }) => {
    it(description, () => {
      const tweetstorm = makeTweetstorm({ active: () => true });
      const items = tweetstorm({ ...props });
      items.forEach((item) => {
        expect(item).toMatchSnapshot({
          id: expect.any(String)
        });
      });
    });
  });
});
