import { BASE_URL } from '../constants';

async function fetchHealth() {
  const response = await fetch(`${BASE_URL}/api/v1/health`);
  const json = await response.json();
  return json;
}

export default fetchHealth;
