import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import classnames from 'classnames';
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
        'bg-gray-300 border border-gray-500 font-bold px-4 mb-2 rounded self-center',
        {
          'bg-blue-600 text-white': !disabled,
          'cursor-auto': disabled
        }
      )}
      data-testid="tweet"
      onClick={onClick}
    >
      {waiting ? <FontAwesomeIcon icon={faSpinner} spin={true} /> : copy.Tweet}
    </button>
  );
}

export default TweetstormButton;
