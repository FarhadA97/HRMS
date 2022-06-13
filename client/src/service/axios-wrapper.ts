import axios from 'axios';

const apiRoot = 'http://localhost:9000/';

/**
 * Create an Axios Client with baseURL as default
 */
const client = axios.create({
  baseURL: apiRoot,
});

/**
 * A lightweight wrapper for axios - a Promise based HTTP client for the browser and node.js
 * see https://github.com/axios/axios#request-config for config options
 */
const request = async (options: {}) => {
  const onSuccess = (response: {}) => {
    return response;
  };

  const onError = (error: {
    config: {};
    response: { status: string; data: {}; headers: {} };
    message: string;
  }) => {
    return error.response || error.message;
  };

  const response = await client(options)
    .then(onSuccess)
    .catch(onError);

  return response;
};

export default request;