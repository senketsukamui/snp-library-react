export const makeRequest = (requestType, url, body = {}) => {
  if (!["GET", "POST", "DELETE", "PATCH"].includes(requestType)) {
    console.error(`No such request type ${requestType}`);
    return;
  }
  return fetch(url, {
    method: requestType,
    body: JSON.stringify(body),
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    console.error(`${requestType} request error`);
  });
};
