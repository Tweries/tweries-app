import React from 'react';

function Counter({ length, show }) {
  const value = show ? (length === 0 ? '' : length) : '';
  return <small className="App__counter">{value}</small>;
}

export default Counter;
