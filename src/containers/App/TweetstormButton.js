import classnames from 'classnames';
import React from 'react';

function TweetstormButton({ disabled, onClick }) {
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
      Tweet
    </button>
  );
}

export default TweetstormButton;
