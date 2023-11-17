import axios from "axios";
import { toast } from "react-toastify";
import { SERVER_ERROR_MESSAGE } from "./common/consts";

export const getFirstFiveSymbols = async () => {
  try {
    const response = await axios.get('/symbols', {
      headers: {
        accept: 'application/json'
      },
      withCredentials: true,
    });
    return response.data.slice(0, 5).map((symbol) => symbol.toUpperCase());
  } catch (error) {
    error.code === "ERR_BAD_RESPONSE" ? toast.error(SERVER_ERROR_MESSAGE) : toast.error(error.message)
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
    error.code === "ERR_BAD_RESPONSE" ? toast.error(SERVER_ERROR_MESSAGE) : toast.error(error.message)
  }
}
