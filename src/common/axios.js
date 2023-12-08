import axios from 'axios';

export const axiosRequest = async ({
  endpoint,
  method = 'get',
  data = null,
}) => {
  try {
    const config = {
      headers: {
        accept: 'application/json',
      },
      withCredentials: true,
    };

    let response;
    switch (method) {
      case 'get':
        response = await axios.get(endpoint, config);
        break;
      case 'post':
        response = await axios.post(endpoint, data, config);
        break;
      case 'delete':
        response = await axios.delete(endpoint, data, config);
        break;
      case 'put':
        response = await axios.put(endpoint, data, config);
        break;

      default:
        throw new Error(`Unsupported HTTP method: ${method}`);
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};
