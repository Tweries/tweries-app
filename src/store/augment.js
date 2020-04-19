import { types } from './makeReducer';

// TODO: change it into some sort of middleware(s)
function augment({ logEvent, reducer }) {
  // TODO: fix name
  function logAction(state, action) {
    // console.log('state:', state);
    // console.log('action:', action);
    const newState = reducer(state, action);
    // console.log('newState:', newState);
    switch (action.type) {
      case types.CHANGE_SOURCE:
      case types.CHANGE_TWEET:
        break;
      default:
        logEvent(action.type, action.value);
        break;
    }
    return newState;
  }
  return logAction;
}

export default augment;
