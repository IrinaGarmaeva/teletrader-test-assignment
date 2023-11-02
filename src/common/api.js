import axios from 'axios';

export const getFirstFiveSymbols = async () => {
  try {
    const response = await axios.get('/symbols', {
      headers: {
        accept: 'application/json'
      },
      withCredentials: true,
    });

    if(response.status === 200){
      const symbolList = response.data.slice(0, 5).map(symbol => symbol.toUpperCase())
      console.log(symbolList)
      return symbolList
    } else {
      console.error('Failed to fetch data: ', response.status, response.statusText)
    }
  } catch (error) {
    console.error(`Error: ${error.message}`)
  }
}

export const getTickers = async (symbol) => {
  try {
    const response = await axios.get(`/ticker-by/${symbol}`)
    if (response.status === 200) {
      return response
    } else {
      console.error('Failed to fetch data: ', response.status, response.statusText)
    }
  } catch (error) {
    console.error(`Error: ${error.message}`)
  }
}




