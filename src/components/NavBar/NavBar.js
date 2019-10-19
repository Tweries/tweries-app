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
          <img alt={user.name} key="img" src={user.picture} />,
          <span key="span">
            <span aria-label="hello" role="img">
              👋
            </span>{' '}
            {user.name}
          </span>,
          <button
            data-testid="logout"
            key="button"
            onClick={() =>
              logout({
                returnTo: window.location.href
              })
            }
          >
            Log out
          </button>
        ]
      ) : (
        <button data-testid="login" onClick={() => loginWithRedirect({})}>
          Log in
        </button>
      )}
    </header>
  );
};

export default NavBar;
