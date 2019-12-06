import { BASE_URL } from '../constants';

async function fetchTweetstorm({ inReplyToTweetUrl, items, userId }) {
  const response = await fetch(`${BASE_URL}/api/v2/tweetstorm`, {
    body: JSON.stringify({ inReplyToTweetUrl, items, userId }),
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST'
  });
  const json = await response.json();
  return json;
}

export default fetchTweetstorm;
