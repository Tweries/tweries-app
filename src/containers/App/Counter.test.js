import { render } from '@testing-library/react';
import React from 'react';
import Counter from './Counter';

describe('Counter', () => {
  const scenarios = [
    {
      description: 'length 123',
      props: {
        length: 123
      }
    },
    {
      description: 'length 0',
      props: {
        length: 0
      }
    },
    {
      description: 'length 300, tweet',
      props: {
        length: 300,
        type: 'tweet'
      }
    },
    {
      description: 'length 300, source',
      props: {
        length: 300
      }
    }
  ];

  scenarios.forEach(({ description, props }) => {
    it(description, () => {
      const { container } = render(<Counter {...props} />);
      expect(container).toMatchSnapshot();
    });
  });
});
