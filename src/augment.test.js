import augment from './augment';

describe('augment', () => {
  it('logAction', () => {
    const mockReducer = jest.fn();
    const logAction = augment(mockReducer);
    const action = { type: 'UNKNOWN', value: null };
    logAction(null, action);
    expect(mockReducer).toBeCalledWith(null, action);
  });
});
