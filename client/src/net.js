const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(`HTTP Error ${response.statusText}`);
  error.status = response.statusText;
  error.response = response;
  console.log(error); // eslint-disable-line no-console
  throw error;
};

const parseJson = (response) => {
  return response.json();
};

export const rpc = (url, req) => {
  return fetch(url, {
    method: 'POST',
    accept: 'application/json',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(req),
  })
  .then(checkStatus)
  .then(parseJson);
};

export default {
  rpc,
};
