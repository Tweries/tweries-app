import React from 'react';

const copy = {
  'Log in': 'Log in',
  'Log out': 'Log out'
};

function NavBar({ isAuthenticated, loginWithRedirect, logout, user }) {
  return (
    <header className="flex flex-row justify-between">
      {isAuthenticated ? (
        <>
          <div className="flex items-center">
            <img
              alt={user.name}
              className="border border-gray-500 rounded-full"
              src={user.picture}
            />
            <span className="px-2">{user.name}</span>
          </div>
          <button
            className="font-bold px-4 underline"
            data-testid="logout"
            onClick={() =>
              logout({
                returnTo: window.location.href
              })
            }
          >
            {copy['Log out']}
          </button>
        </>
      ) : (
        <span>&nbsp;</span>
      )}
    </header>
  );
}

export default NavBar;
