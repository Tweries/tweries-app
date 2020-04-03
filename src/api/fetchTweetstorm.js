import { BASE_URL } from '../constants';

async function fetchTweetstorm({ cover, inReplyToTweetUrl, items, userId }) {
  // CHECK: https://programmingwithmosh.com/javascript/react-file-upload-proper-server-side-nodejs-easy/

  const formData = new FormData();

  formData.append('cover', cover);
  formData.append('inReplyToTweetUrl', inReplyToTweetUrl);
  formData.append('items', JSON.stringify(items));
  formData.append('userId', userId);

  const response = await fetch(`${BASE_URL}/api/v2/tweetstorm`, {
    body: formData,
    method: 'POST'
  });
  const json = await response.json();
  return json;
}

export default fetchTweetstorm;
