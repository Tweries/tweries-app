import makeItem from './makeItem';

const HASHTAGS = '#prodmgmt';

describe('makeItem', () => {
  it('Foo', () => {
    expect(makeItem(HASHTAGS, null, 4, 1, 'Foo')).toMatchSnapshot({
      id: expect.any(String)
    });
  });
});
