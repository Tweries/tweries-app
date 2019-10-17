import React, { useEffect } from 'react';
import { useAuth0 } from '../../react-auth0-wrapper';
import './NavBar.css';

const NavBar = ({ dispatch }) => {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      dispatch({ type: 'SET_USER_ID', value: user.sub });
    }
  }, [dispatch, isAuthenticated, user]);

  return (
    <header className="NavBar">
      {isAuthenticated ? (
        [
          <button
            key="button"
            onClick={() =>
              logout({
                returnTo: window.location.href
              })
            }
          >
            Log out
          </button>,
          <img alt={user.name} key="img" src={user.picture} />
        ]
      ) : (
        <button onClick={() => loginWithRedirect({})}>Log in</button>
      )}
    </header>
  );
};

export default NavBar;
