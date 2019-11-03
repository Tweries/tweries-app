import makeInitialState from './makeInitialState';

test('to match snapshot', () => {
  expect(makeInitialState({ feature: jest.fn() })).toMatchSnapshot();
});
