import React from 'react';

const copy = {
  'Log in': 'Log in',
  'Log out': 'Log out'
};

const NavBar = ({
  dispatch,
  isAuthenticated,
  loginWithRedirect,
  logout,
  user
}) => {
  return (
    <header className="flex flex-col items-center">
      {isAuthenticated ? (
        [
          <img
            alt={user.name}
            className="border border-gray-500 rounded"
            key="img"
            src={user.picture}
          />,
          <span key="span">
            <span aria-label="hello" role="img">
              👋
            </span>{' '}
            {user.name}
          </span>,
          <button
            className="bg-gray-300 border border-gray-500 font-bold px-4 rounded"
            data-testid="logout"
            key="button"
            onClick={() =>
              logout({
                returnTo: window.location.href
              })
            }
          >
            {copy['Log out']}
          </button>
        ]
      ) : (
        <button
          className="bg-gray-300 border border-gray-500 font-bold px-4 rounded"
          data-testid="login"
          onClick={() => loginWithRedirect({})}
        >
          {copy['Log in']}
        </button>
      )}
    </header>
  );
};

export default NavBar;
