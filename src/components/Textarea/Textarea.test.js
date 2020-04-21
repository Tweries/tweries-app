import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import Textarea from './Textarea';

describe('<Textarea />', () => {
  it('less than 280', () => {
    const { container } = render(
      <Textarea
        item={{
          id: '_mno97ls38',
          tweet: 'Silence is sometimes the best answer.'
        }}
      />
    );

    expect(container).toMatchSnapshot();
  });

  it('greater than 280', () => {
    const { container } = render(
      <Textarea
        item={{
          id: '_mno97ls38',
          tweet:
            'The poem begins on the night of Maundy Thursday on March 24 (or April 7), AD 1300, shortly before dawn of Good Friday.[3][4] The narrator, Dante himself, is thirty-five years old, and thus "midway in the journey of our life" (Nel mezzo del cammin di nostra vita[5]) – half of the Biblical lifespan of seventy (Psalm 89:10, Vulgate; Psalm 90:10, KJV). The poet finds himself lost in a dark wood (selva oscura[6]), astray from the "straight way" (diritta via,[7] also translatable as "right way") of salvation. He sets out to climb directly up a small mountain, but his way is blocked by three beasts he cannot evade: a lonza[8] (usually rendered as "leopard" or "leopon"),[9] a leone[10] (lion), and a lupa[11] (she-wolf). The three beasts, taken from the Jeremiah 5:6, are thought to symbolize the three kinds of sin that bring the unrepentant soul into one of the three major divisions of Hell. According to John Ciardi, these are incontinence (the she-wolf); violence and bestiality (the lion); and fraud and malice (the leopard);[12] Dorothy L. Sayers assigns the leopard to incontinence and the she-wolf to fraud/malice.[13] It is now dawn of Good Friday, April 8, with the sun rising in Aries. The beasts drive him back despairing into the darkness of error, a "lower place" (basso loco[14]) where the sun is silent (l sol tace[15]). However, Dante is rescued by a figure who announces that he was born sub Iulio[16] (i.e. in the time of Julius Caesar) and lived under Augustus: it is the shade of the Roman poet Virgil, author of the Aeneid, a Latin epic.'
        }}
      />
    );

    expect(container).toMatchSnapshot();
  });

  it('onChange', () => {
    const onChange = jest.fn();

    const { getByTestId } = render(
      <Textarea
        item={{
          id: '_mno97ls38',
          tweet: 'Silence'
        }}
        onChange={onChange}
      />
    );

    fireEvent.change(getByTestId('textarea'), {
      target: { value: 'Silence is' }
    });

    expect(onChange).toBeCalled();
  });
});
