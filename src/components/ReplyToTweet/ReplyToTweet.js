import classnames from 'classnames';
import React, { useEffect, useState } from 'react'; // TODO: move to containers
import fetchTweet from '../../api/fetchTweet';

const copy = {
  'Optional: reply to Tweet URL': 'Optional: reply to Tweet URL'
};

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
    <textarea
      className={classnames('border border-gray-500 p-2 rounded', {
        'bg-gray-200': waiting === true || tweetUrl === '',
        'bg-green-200': waiting === false && tweetUrl !== '' && isValidTweet,
        'bg-red-200': waiting === false && tweetUrl !== '' && !isValidTweet
      })}
      data-testid="reply-to"
      onChange={({ target: { value } }) => {
        onChange(value);
      }}
      placeholder={copy['Optional: reply to Tweet URL']}
      rows={1}
      value={tweetUrl}
    />
  );
}

export default ReplyToTweet;
