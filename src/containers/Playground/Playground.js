import React from 'react';
import { useAuth0 } from '../../react-auth0-wrapper';
import ReplyToTweet from '../ReplyToTweet/ReplyToTweet';
import './Playground.css';

function Playground() {
  const { user } = useAuth0();

  const tweetUrl = 'https://twitter.com/mattiaerre/status/1256370963622629376';

  return (
    <div className="Playground">
      {user ? (
        <>
          <ReplyToTweet
            callback={console.log}
            onChange={console.log}
            tweetUrl={tweetUrl}
            userId={user.sub}
          />
          <pre>userId: {user.sub}</pre>
        </>
      ) : (
        <span>Loading user ...</span>
      )}
    </div>
  );
}

export default Playground;
