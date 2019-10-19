import v from 'voca';

const SOURCE = 'YATTA, ';

test('prune 4', () => {
  expect(v.prune(SOURCE, 4, '')).toEqual('');
});

test('prune 5', () => {
  expect(v.prune(SOURCE, 5, '')).toEqual('YATTA');
});

test('prune 6', () => {
  expect(v.prune(SOURCE, 6, '')).toEqual('YATTA'); // INFO: this should be 'YATTA,' to me
});

test('prune 7', () => {
  expect(v.prune(SOURCE, 7, '')).toEqual('YATTA, ');
});
