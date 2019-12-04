import { BASE_URL } from '../constants';

async function fetchTweet({ replyToTweetUrl, userId }) {
  const response = await fetch(`${BASE_URL}/api/v2/tweet`, {
    body: JSON.stringify({ tweetUrl: replyToTweetUrl, userId }),
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST'
  });
  const json = await response.json();
  return json;
}

export default fetchTweet;
