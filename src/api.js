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

export const getTicker = async (symbol) => {
  try {
    // const response = await axios.get(`/ticker/${symbol}`, {
      const response = await axios.get(`/pubticker/${symbol}`, {
      headers: {
        accept: 'application/json'
      },
      withCredentials: true,
    })
    if(response.status === 200) {
      return response
    }
  } catch (error) {
    console.error(`Error getting ${symbol} data: ${error.message}`)
  }
}
