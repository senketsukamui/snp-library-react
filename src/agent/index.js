export const getRequest = (url) => {
  return fetch(url)
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.error(err);
    });
};

export const postRequest = (url, body = {}) => {
  return fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    console.error("Error");
  });
};

export const api = "http://192.168.1.41:3000/books";
