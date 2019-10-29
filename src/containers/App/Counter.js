import React from 'react';

function Counter({ length }) {
  const value = length === 0 ? '' : length;
  return <small className="App__counter">{value}</small>;
}

export default Counter;
