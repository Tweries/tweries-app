import { types } from '../../store/makeReducer';
import makeOnChangeSource from './makeOnChangeSource';

describe('makeOnChangeSource', () => {
  it('onChangeSource', () => {
    const mockDispatch = jest.fn();
    const mockSetSource = jest.fn();

    const onChangeSource = makeOnChangeSource({
      dispatch: mockDispatch,
      setSource: mockSetSource
    });
    const value = 'HELLO!';

    onChangeSource({ target: { value } });

    expect(mockDispatch).toBeCalledWith({
      type: types.CHANGE_SOURCE,
      value
    });
    expect(mockSetSource).toBeCalledWith(value);
  });
});
