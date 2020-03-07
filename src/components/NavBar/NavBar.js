import React from 'react';

const copy = {
  'Log out': 'Log out'
};

function NavBar({ logout, user }) {
  return (
    <>
      <p className="flex items-center">
        <img
          alt={user.name}
          className="border tweries-border-color rounded-full"
          src={user.picture}
        />
        <span className="px-2">{user.name}</span>
      </p>
      <button
        className="px-4 underline"
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
  );
}

export default NavBar;
