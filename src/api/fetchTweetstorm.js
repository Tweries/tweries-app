import { BASE_URL } from '../constants';

async function fetchTweetstorm({ items, replyToStatusId, userId }) {
  const response = await fetch(`${BASE_URL}/api/v1/tweetstorm`, {
    body: JSON.stringify({ items, replyToStatusId, userId }),
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST'
  });
  const json = await response.json();
  return json;
}

export default fetchTweetstorm;
