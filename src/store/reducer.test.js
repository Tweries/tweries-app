import makeInitialState from './initialState';
import reducer from './reducer';

describe('reducer', () => {
  it('default', () => {
    const state = reducer(undefined, { type: 'UNKNOWN', value: undefined });
    expect(state).toEqual(makeInitialState());
  });
});
