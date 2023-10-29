import axios from 'axios';


export const getFirst5Symbols = async () => {
  try {
    const response = await axios.get('/bitfinex-symbols')
    // const response = await axios.get('https://api.bitfinex.com/v1/symbols') если использовать эту ссылку, ошибка корс
    if(response.status === 200){
      const symbolList = await response.data.slice(0, 5)
      console.log(symbolList)
      return symbolList
    } else {
      console.error('Failed to fetch data: ', response.status, response.statusText)
    }
  } catch (error) {
    console.error(`Error: ${error.message}`)
  }
}

// import io from 'socket.io-client';

// export const getFirst5Symbols = () => {
//   return new Promise((resolve, reject) => {
//     try {
//       //const socket = io('ws://localhost:3000'); // Connect to your WebSocket proxy server

//       // Listen for the 'subscribe' event from the server
//       socket.on('subscribe', (data) => {
//         console.log('Received data from server:', data);
//         const first5Symbols = data.slice(0, 5);
//         resolve(first5Symbols); // Resolve with the first 5 symbols
//       });

//       // Handle errors
//       socket.on('error', (error) => {
//         console.error('Socket error:', error);
//         reject(error);
//       });
//     } catch (error) {
//       console.error(`Error: ${error.message}`);
//       reject(error);
//     }
//   });
// };
