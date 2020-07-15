import { getJwtToken } from './TokenUtils';

export default async function authorizedRequest(url, method = 'GET', body) {
  const jwtToken = getJwtToken();
  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwtToken}`,
    },
    body,
  });
  const parsedResponse = await response.json();
  return parsedResponse;
}
