import PropTypes from 'prop-types';
import React, { useState } from 'react';

const copy = {
  'Log out': 'Log out'
};

function NavBar({ logout, user }) {
  const [src, setSrc] = useState(user.picture);

  return (
    <>
      <p className="flex items-center">
        <img
          alt={user.name}
          className="border tweries-border-color rounded-full"
          onError={() => setSrc('./square.svg')}
          src={src}
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
        type="button"
      >
        {copy['Log out']}
      </button>
    </>
  );
}

NavBar.propTypes = {
  logout: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

export default NavBar;
