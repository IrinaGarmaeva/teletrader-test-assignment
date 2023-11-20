import { toast } from "react-toastify";
import { SERVER_ERROR_MESSAGE } from "./common/consts";
import { axiosRequest } from "./common/axios";

export const getFirstFiveSymbols = async () => {
  try {
    const symbols = await axiosRequest({endpoint: '/symbols'})
    return symbols.slice(0, 5).map((symbol) => symbol.toUpperCase());
  } catch (error) {
    error.code === "ERR_BAD_RESPONSE" ? toast.error(SERVER_ERROR_MESSAGE) : toast.error(error.message)
  }
}

export const getTicker = async (symbol) => {
  try {
    return await axiosRequest({endpoint: `/pubticker/${symbol}`})
  } catch (error) {
    error.code === "ERR_BAD_RESPONSE" ? toast.error(SERVER_ERROR_MESSAGE) : toast.error(error.message)
  }
}

