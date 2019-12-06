import { BASE_URL } from '../constants';

async function fetchTweet({ inReplyToTweetUrl, userId }) {
  const response = await fetch(`${BASE_URL}/api/v2/tweet`, {
    body: JSON.stringify({ tweetUrl: inReplyToTweetUrl, userId }),
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST'
  });
  const json = await response.json();
  return json;
}

export default fetchTweet;
