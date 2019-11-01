function augment({ logEvent, reducer }) {
  // TODO: fix name
  function logAction(state, action) {
    // console.log('state:', state);
    // console.log('action:', action);
    const newState = reducer(state, action);
    // console.log('newState:', newState);
    logEvent(action.type, action.value);
    return newState;
  }
  return logAction;
}

export default augment;
