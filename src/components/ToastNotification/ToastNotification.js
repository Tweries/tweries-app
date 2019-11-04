import classnames from 'classnames';
import React from 'react';

function ToastNotification({ notification, onClick }) {
  if (notification) {
    const { message, type } = notification;
    return (
      <div
        className={classnames('border flex justify-between mb-2 p-2 rounded', {
          'bg-green-100 border-green-800 text-green-800': type === 'success',
          'bg-red-100 border-red-800 text-red-800': type === 'danger'
        })}
      >
        <span>{message}</span>
        <button className="font-bold" data-testid="dismiss" onClick={onClick}>
          &times;
        </button>
      </div>
    );
  } else {
    return null;
  }
}

export default ToastNotification;
