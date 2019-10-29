function augment(reducer) {
  function logAction(state, action) {
    // console.log('state:', state);
    // console.log('action:', action);
    const newState = reducer(state, action);
    // console.log('newState:', newState);
    return newState;
  }
  return logAction;
}

export default augment;
