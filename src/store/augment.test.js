import augment from './augment';

describe('augment', () => {
  it('logAction', () => {
    const mockLogEvent = jest.fn();
    const mockReducer = jest.fn();
    const logAction = augment({ logEvent: mockLogEvent, reducer: mockReducer });
    const action = { type: 'UNKNOWN', value: undefined };
    logAction(undefined, action);
    expect(mockReducer).toBeCalledWith(undefined, action);
    expect(mockLogEvent).toBeCalledWith(action.type, undefined);
  });
});
