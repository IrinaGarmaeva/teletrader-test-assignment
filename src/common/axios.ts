import axios, { AxiosError, Method } from 'axios';

type RequestParams = {
  endpoint: string,
  method?: Method,
  data?: any,
};

const axiosRequest = async ({
  endpoint,
  method = 'get',
  data = null,
}: RequestParams) => {
  const config = {
    headers: {
      accept: 'application/json',
    },
    withCredentials: true,
  };

  try {
    const response = await axios.request({
      url: endpoint,
      method,
      data: method === 'delete' ? data : null,
      ...config,
    });

    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      throw new Error('Request failed with a client-side error');
    } else if (axiosError.request) {
      throw new Error('Request failed without receiving a response');
    } else {
      throw new Error('Request failed');
    }
  }
};

export default axiosRequest;
