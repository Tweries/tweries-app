import React from 'react';
import { useAuth0 } from '../../react-auth0-wrapper';
import NavBar from '../NavBar/NavBar';

function Layout() {
  const {
    isAuthenticated,
    loading,
    loginWithRedirect,
    logout,
    user
  } = useAuth0();

  return (
    <div className="container mx-auto px-4">
      <div className="flex mb-4">
        <div className="w-full">
          {loading ? (
            <h2 className="text-center">...</h2>
          ) : (
            <NavBar
              dispatch={console.log}
              isAuthenticated={isAuthenticated}
              loginWithRedirect={loginWithRedirect}
              logout={logout}
              user={user}
            />
          )}
        </div>
      </div>
      <div className="flex mb-4">
        <div className="w-full">
          <h1 className="font-bold logo my-4 text-5xl text-center">Tweries</h1>
        </div>
      </div>
    </div>
  );
}

export default Layout;
