import classnames from 'classnames';
import React from 'react';
import './ToastNotification.css';

function ToastNotification({ notification, onClick }) {
  if (notification) {
    const { message, type } = notification;
    return (
      <div
        className={classnames('ToastNotification', {
          'ToastNotification--success': type === 'success',
          'ToastNotification--danger': type === 'danger'
        })}
      >
        <span>{message}</span>
        <button data-testid="dismiss" onClick={onClick}>
          &times;
        </button>
      </div>
    );
  } else {
    return null;
  }
}

export default ToastNotification;
