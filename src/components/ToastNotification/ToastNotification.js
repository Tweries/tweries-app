import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { DANGER, SUCCESS } from '../../constants';

const copy = {
  'Your tweetstorm has been created!': 'Your tweetstorm has been created!'
};

function ToastNotification({ notification, onClick }) {
  if (notification) {
    const { link, message, type } = notification;
    return (
      <p
        className={classnames('border flex justify-between mb-2 p-2 rounded', {
          'bg-green-100 border-green-800 text-green-800': type === SUCCESS,
          'bg-red-100 border-red-800 text-red-800': type === DANGER
        })}
        data-testid="notification"
      >
        <span>
          {type === DANGER && message}
          {type === SUCCESS && (
            <a
              className="underline"
              href={link}
              rel="noopener noreferrer"
              target="_blank"
            >
              {copy['Your tweetstorm has been created!']}
            </a>
          )}
        </span>
        <button
          className="font-bold"
          data-testid="dismiss"
          onClick={onClick}
          type="button"
        >
          &times;
        </button>
      </p>
    );
  }
  return null;
}

ToastNotification.defaultProps = {
  notification: null
};

ToastNotification.propTypes = {
  notification: PropTypes.object,
  onClick: PropTypes.func.isRequired
};

export default ToastNotification;
