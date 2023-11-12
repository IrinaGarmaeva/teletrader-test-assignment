import axios from "axios";

export const getCryptoPairNames = async () => {
  try {
    const response = await axios.get('/cryptoPairNames', {
      headers: {
        accept: 'application/json'
      },
      withCredentials: true,
    });
    return response.data.slice(0, 5).map((cryptoPairName) => cryptoPairName.toUpperCase());
  } catch (error) {
    console.error(`Error getting crypto pair names: ${error.message}`)
  }
}
