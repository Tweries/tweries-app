import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import fetchTweet from '../../api/fetchTweet';

const copy = {
  'If you want to reply to a specific Tweet:':
    'If you want to reply to a specific Tweet:',
  'Optional: reply to Tweet URL': 'Optional: reply to Tweet URL',
  'URL goes here': 'URL goes here'
};

// TODO: move to containers
function ReplyToTweet({ callback, onChange, tweetUrl, userId }) {
  const [isValidTweet, setIsValidTweet] = useState(false);
  const [waiting, setWaiting] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetchTweet({
          inReplyToTweetUrl: tweetUrl,
          userId
        });
        console.log(response);
        if (response.data) {
          callback(null, response.data);
          setIsValidTweet(true);
          setWaiting(false);
        } else {
          callback(response.error);
          setIsValidTweet(false);
          setWaiting(false);
        }
      } catch (error) {
        callback(error);
        setIsValidTweet(false);
        setWaiting(false);
      }
    }
    if (tweetUrl && userId) {
      setWaiting(true);
      fetchData();
    }
  }, [callback, tweetUrl, userId]);

  return (
    <>
      <label className="pb-1 text-sm" htmlFor="reply-to">
        {copy['If you want to reply to a specific Tweet:']}
      </label>
      <textarea
        className={classnames('p-2 tweries-border', {
          'tweries-background-color-blue-white':
            waiting === true || tweetUrl === '',
          'bg-green-200': waiting === false && tweetUrl !== '' && isValidTweet,
          'bg-red-200': waiting === false && tweetUrl !== '' && !isValidTweet
        })}
        data-testid="reply-to"
        name="reply-to"
        onChange={({ target: { value } }) => {
          onChange(value);
        }}
        placeholder={copy['URL goes here']}
        rows={1}
        value={tweetUrl}
      />
    </>
  );
}

ReplyToTweet.propTypes = {
  callback: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  tweetUrl: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired
};

export default ReplyToTweet;
