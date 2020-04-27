import { faInfo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';

const copy = {
  'Log in': 'Log in',
  'Login is necessary in order for your series of Tweets to be sent through your Twitter account':
    'Login is necessary in order for your series of Tweets to be sent through your Twitter account'
};

function LogIn({ loginWithRedirect }) {
  return (
    <>
      <p className="flex justify-center my-4">
        <button
          className="font-bold px-6 py-2 rounded tweries-background-color-blue-button"
          data-testid="login"
          onClick={() => loginWithRedirect({})}
          type="button"
        >
          {copy['Log in']}
        </button>
      </p>
      <p className="flex justify-center my-4">
        <FontAwesomeIcon
          className="tooltip tweries-color-dark-blue"
          icon={faInfo}
          size="1x"
        />
        <span className="p-3 mt-6 -ml-1 tooltip-text tweries-border">
          {
            copy[
              'Login is necessary in order for your series of Tweets to be sent through your Twitter account'
            ]
          }
        </span>
      </p>
    </>
  );
}

LogIn.propTypes = {
  loginWithRedirect: PropTypes.func.isRequired
};

export default LogIn;
