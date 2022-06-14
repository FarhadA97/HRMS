import axios from "axios";

const apiRoot = process.env.REACT_APP_BASE_URL!;

const client = axios.create({
  baseURL: apiRoot,
});

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

  const response = await client(options).then(onSuccess).catch(onError);

  return response;
};

export default request;
