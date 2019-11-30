import classnames from 'classnames';
import React, { useEffect, useState } from 'react';
import fetchTweet from '../../api/fetchTweet';

const copy = {
  'Optional: reply to Tweet URL': 'Optional: reply to Tweet URL'
};

function ReplyToTweet({ onChangeId, onChangeUrl, userId, value }) {
  const [id, setId] = useState(null);
  const [waiting, setWaiting] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const { statusId } = await fetchTweet({
          replyToTweetUrl: value,
          userId
        });
        if (statusId) {
          setWaiting(false);
          setId(statusId);
        } else {
          setWaiting(false);
          setId(null);
        }
      } catch (error) {
        setWaiting(false);
        setId(null);
      }
    }
    if (userId && value) {
      setWaiting(true);
      fetchData();
    }
  }, [userId, value]);

  useEffect(() => {
    onChangeId(id);
  }, [id, onChangeId]);

  return (
    <textarea
      className={classnames('border border-gray-500 p-2 rounded', {
        'bg-gray-200': waiting === true || value === '',
        'bg-green-200': waiting === false && value !== '' && id !== null,
        'bg-red-200': waiting === false && value !== '' && id === null
      })}
      data-testid="reply-to"
      onChange={({ target: { value } }) => {
        // TODO: add a debounce
        onChangeUrl(value);
      }}
      placeholder={copy['Optional: reply to Tweet URL']}
      rows={1}
      value={value}
    />
  );
}

export default ReplyToTweet;
