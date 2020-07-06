export const getRequest = (url) => {
  return fetch(url)
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.error(err);
    });
};

export const api = "http://192.168.1.41:3000/books";
