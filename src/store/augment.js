import { types } from './reducer';

function augment({ logEvent, reducer }) {
  // TODO: fix name
  function logAction(state, action) {
    // console.log('state:', state);
    // console.log('action:', action);
    const newState = reducer(state, action);
    // console.log('newState:', newState);
    switch (action.type) {
      case types.CHANGE_HASHTAGS:
      case types.CHANGE_SOURCE:
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
