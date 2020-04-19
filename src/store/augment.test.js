import augment from './augment';
import { types } from './makeReducer';

describe('augment', () => {
  it('logAction UNKNOWN', () => {
    const mockLogEvent = jest.fn();
    const mockReducer = jest.fn();
    const logAction = augment({ logEvent: mockLogEvent, reducer: mockReducer });
    const action = { type: 'UNKNOWN', value: undefined };
    logAction(undefined, action);
    expect(mockReducer).toBeCalledWith(undefined, action);
    expect(mockLogEvent).toBeCalledWith(action.type, undefined);
  });

  [types.CHANGE_SOURCE].forEach((type) => {
    it(`logAction ${type}`, () => {
      const mockLogEvent = jest.fn();
      const mockReducer = jest.fn();
      const logAction = augment({
        logEvent: mockLogEvent,
        reducer: mockReducer
      });
      const action = { type, value: 'HELLO' };
      logAction(undefined, action);
      expect(mockReducer).toBeCalledWith(undefined, action);
      expect(mockLogEvent).not.toBeCalled();
    });
  });
});
