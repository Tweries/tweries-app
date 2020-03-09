import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { MAX_LENGTH } from '../../constants';

// TODO: move to components
function Counter({ length, type }) {
  const value = length === 0 ? null : length;
  const danger = type === 'tweet';

  return (
    <p
      className={classnames('text-right text-xs', {
        'text-gray-700': !danger || (danger && length <= MAX_LENGTH),
        'text-red-500 ': danger && length > MAX_LENGTH
      })}
    >
      &nbsp;
      {value}
    </p>
  );
}

Counter.propTypes = {
  length: PropTypes.number.isRequired,
  type: PropTypes.string
};

Counter.defaultProps = {
  type: ''
};

export default Counter;
