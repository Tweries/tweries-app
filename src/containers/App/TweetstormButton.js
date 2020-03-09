import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

const copy = {
  Tweet: 'Tweet'
};

// TODO: move to components
function TweetstormButton({ disabled, onClick, waiting }) {
  return (
    <button
      disabled={disabled}
      className={classnames(
        'bg-gray-300 border border-gray-500 font-bold my-4 px-6 py-2 rounded self-center',
        {
          'tweries-background-color-blue-button': !disabled,
          'cursor-auto': disabled
        }
      )}
      data-testid="tweet"
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
