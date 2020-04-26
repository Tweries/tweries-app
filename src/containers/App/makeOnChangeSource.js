import { types } from '../../store/makeReducer';

function makeOnChangeSource({ dispatch, setSource }) {
  function onChangeSource(e) {
    dispatch({
      type: types.CHANGE_SOURCE,
      value: e.target.value
    });
    setSource(e.target.value);
  }

  return onChangeSource;
}

export default makeOnChangeSource;
