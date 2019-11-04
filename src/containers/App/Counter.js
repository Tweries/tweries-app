import React from 'react';

function Counter({ length }) {
  const value = length === 0 ? '' : length;
  return <small className="mb-2 text-gray-700 text-right">{value}</small>;
}

export default Counter;
