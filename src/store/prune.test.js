import v from 'voca';

test('prune 5', () => {
  expect(v.prune('YATTA,', 5, '')).toEqual('YATTA');
});

test('prune 6', () => {
  expect(v.prune('YATTA,', 6, '')).toEqual('YATTA,');
});
