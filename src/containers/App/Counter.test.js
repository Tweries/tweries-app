import { render } from '@testing-library/react';
import React from 'react';
import Counter from './Counter';

describe('Counter', () => {
  const scenarios = [
    {
      description: 'length 123',
      props: {
        length: 123,
        show: true
      }
    },
    {
      description: 'length 0',
      props: {
        length: 0,
        show: true
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
