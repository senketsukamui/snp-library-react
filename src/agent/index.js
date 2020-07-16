export const getRequest = (url) => {
  return fetch(url)
    .then((response) => {
      if (!response.ok) throw new Error();
      return response.json();
    })
    .catch((err) => {
      throw new Error(err);
    });
};

export const postRequest = (url, body = {}) => {
  return fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }).then((response) => {
    if (!response.ok) throw new Error();
    return response.json();
  });
};

export const deleteRequest = (url, id) => {
  return fetch(url + `/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  }).catch((error) => {
    console.error(error);
  });
};

export const putRequest = (url, id, body = {}) => {
  return fetch(url + `/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }).then((response) => {
    if (!response.ok) throw new Error();
    return response.json();
  });
};

export const getFilteredTodos = (url, string, body = {}) => {
  return fetch(url + `?q=${string}`).then((response) => {
    if (!response.ok) throw new Error();
    return response.json();
  });
};

export const api = "http://192.168.1.41:3000/books";
