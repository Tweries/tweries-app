import React, { useEffect } from 'react';
import { useAuth0 } from '../../react-auth0-wrapper';
import './NavBar.css';

const NavBar = () => {
  const {
    isAuthenticated,
    loginWithRedirect,
    logout,
    user,
    getIdTokenClaims,
    getTokenSilently,
    getTokenWithPopup
  } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      console.log(JSON.stringify(user, 0, 2));
      // getIdTokenClaims().then(console.log);
      // getTokenSilently().then(console.log);
    }
  }, [
    getIdTokenClaims,
    getTokenSilently,
    getTokenWithPopup,
    isAuthenticated,
    user
  ]);

  return (
    <header className="NavBar">
      {isAuthenticated ? (
        [
          <button key="button" onClick={() => logout()}>
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
