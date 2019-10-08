import makeItem from './makeItem';

const HASHTAGS = '#prodmgmt';

describe('makeItem', () => {
  const scenarios = [
    {
      description: 'new item',
      params: [HASHTAGS, null, 1, 1]
    },
    {
      description: 'update item',
      params: [HASHTAGS, '1001', 2, 1, 'Lorem ipsum dolor sit amet']
    }
  ];

  scenarios.forEach(({ description, params }) => {
    it(description, () => {
      expect(makeItem(...params)).toMatchSnapshot({
        id: expect.any(String)
      });
    });
  });
});
