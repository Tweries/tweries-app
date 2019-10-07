function augment(reducer) {
  function logAction(state, action) {
    // console.log('action:', action);
    return reducer(state, action);
  }
  return logAction;
}

export default augment;
