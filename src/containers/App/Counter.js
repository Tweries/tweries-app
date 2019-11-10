import classnames from 'classnames';
import React from 'react';
import { MAX_LENGTH } from '../../constants';

function Counter({ length, type }) {
  const value = length === 0 ? '' : length;
  const danger = type === 'tweet' ? true : false;

  return (
    <small
      className={classnames('mb-2 text-right', {
        'text-gray-700': !danger || (danger && length <= MAX_LENGTH),
        'text-red-500 ': danger && length > MAX_LENGTH
      })}
    >
      {value}
    </small>
  );
}

export default Counter;
