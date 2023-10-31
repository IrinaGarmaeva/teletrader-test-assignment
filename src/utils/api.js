import axios from 'axios';

export const getFirst5Symbols = async () => {
  try {
    const response = await axios.get('/bitfinex-symbols', {
      headers: {
        accept: 'application/json'
      },
      withCredentials: true,
    });

    if(response.status === 200){
      const symbolList = await response.data.slice(0, 5).map(symbol => symbol.toUpperCase())
      console.log(symbolList)
      return symbolList
    } else {
      console.error('Failed to fetch data: ', response.status, response.statusText)
    }
  } catch (error) {
    console.error(`Error: ${error.message}`)
  }
}

export const getSymbolData = async () => {
  try {

  } catch (error) {
    console.error(`Error: ${error.message}`)
  }
}




