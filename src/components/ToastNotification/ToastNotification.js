import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

function ToastNotification({ notification, onClick }) {
  if (notification) {
    const { message, type } = notification;
    return (
      <p
        className={classnames('border flex justify-between mb-2 p-2 rounded', {
          'bg-green-100 border-green-800 text-green-800': type === 'success',
          'bg-red-100 border-red-800 text-red-800': type === 'danger'
        })}
      >
        <span>{message}</span>
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

ToastNotification.propTypes = {
  notification: PropTypes.shape.isRequired,
  onClick: PropTypes.func.isRequired
};

export default ToastNotification;
