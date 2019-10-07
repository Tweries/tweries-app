import augment from './augment';

describe('augment', () => {
  it('logAction', () => {
    const mockReducer = jest.fn();
    const logAction = augment(mockReducer);
    const action = { type: 'UNKNOWN', value: undefined };
    logAction(undefined, action);
    expect(mockReducer).toBeCalledWith(undefined, action);
  });
});
