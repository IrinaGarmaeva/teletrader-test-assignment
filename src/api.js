import axios from "axios";

export const getSymbols = async () => {
  try {
    const response = await axios.get('/symbols', {
      headers: {
        accept: 'application/json'
      },
      withCredentials: true,
    });
    return response.data.slice(0, 5).map((symbol) => symbol.toUpperCase());
  } catch (error) {
    console.error(`Error getting symbols: ${error.message}`)
  }
}

export const getTicker = async (symbol) => {
  try {
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
