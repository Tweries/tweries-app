import classnames from 'classnames';
import React from 'react';
import { MAX_LENGTH } from '../../constants';

// TODO: move to components
function Counter({ length, type }) {
  const value = length === 0 ? '' : length;
  const danger = type === 'tweet' ? true : false;

  return (
    <p
      className={classnames('text-right text-xs', {
        'text-gray-700': !danger || (danger && length <= MAX_LENGTH),
        'text-red-500 ': danger && length > MAX_LENGTH
      })}
    >
      {value}
    </p>
  );
}

export default Counter;
