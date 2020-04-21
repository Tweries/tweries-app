import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

const copy = {
  Tweet: 'Tweet'
};

function TweetstormButton({ disabled, onClick, waiting }) {
  return (
    <button
      className={classnames(
        'bg-gray-300 border border-gray-500 font-bold my-4 px-6 py-2 rounded self-center',
        {
          'tweries-background-color-blue-button': !(disabled || waiting),
          'cursor-auto': disabled || waiting
        }
      )}
      data-testid="tweet"
      disabled={disabled || waiting}
      onClick={onClick}
      type="button"
    >
      {waiting ? <FontAwesomeIcon icon={faSpinner} spin /> : copy.Tweet}
    </button>
  );
}

TweetstormButton.propTypes = {
  disabled: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  waiting: PropTypes.bool.isRequired
};

export default TweetstormButton;
