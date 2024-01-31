import axios, { AxiosError, Method } from 'axios';

type RequestParams = {
  endpoint: string,
  method?: Method,
  data?: any,
};

const axiosInstance = axios.create({
  headers: {
    accept: 'application/json',
  },
  withCredentials: true,
});

const axiosRequest = async ({
  endpoint,
  method = 'get',
  data = null,
}: RequestParams) => {
  try {
    const response = await axiosInstance.request({
      url: endpoint,
      method,
      data: method === 'delete' ? data : null,
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
