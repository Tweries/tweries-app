import React from 'react';

const copy = {
  'Log in': 'Log in',
  'Log out': 'Log out'
};

function Button({ dataTestId, onClick, copy }) {
  return (
    <button
      className="bg-gray-300 border border-gray-500 font-bold px-4 rounded"
      data-testid={dataTestId}
      onClick={onClick}
    >
      {copy}
    </button>
  );
}

function NavBar({ isAuthenticated, loginWithRedirect, logout, user }) {
  return (
    <header className="flex flex-col items-center">
      {isAuthenticated ? (
        <>
          <img
            alt={user.name}
            className="border border-gray-500 rounded"
            src={user.picture}
          />
          <span>
            <span aria-label="hello" role="img">
              👋
            </span>{' '}
            {user.name}
          </span>
          <Button
            dataTestId="logout"
            onClick={() =>
              logout({
                returnTo: window.location.href
              })
            }
            copy={copy['Log out']}
          />
        </>
      ) : (
        <Button
          dataTestId="login"
          onClick={() => loginWithRedirect({})}
          copy={copy['Log in']}
        />
      )}
    </header>
  );
}

export default NavBar;
