/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from 'react-toastify';
import { SERVER_ERROR_MESSAGE } from './common/consts';
import axiosRequest from './common/axios';

export const getFirstFiveSymbols = async (): Promise<string[]> => {
  try {
    const symbols = await axiosRequest({ endpoint: '/symbols' });
    return symbols.slice(0, 5).map((symbol: string) => symbol.toUpperCase());
  } catch (error: any) {
    const errorMessage = error.code === 'ERR_BAD_RESPONSE' ? SERVER_ERROR_MESSAGE : error.message;
    toast.error(errorMessage);
    throw error;
  }
};

export const getTicker = async (symbol: string): Promise<any> => {
  try {
    return await axiosRequest({ endpoint: `/pubticker/${symbol}` });
  } catch (error: any) {
    const errorMessage = error.code === 'ERR_BAD_RESPONSE' ? SERVER_ERROR_MESSAGE : error.message;
    toast.error(errorMessage);
    throw error;
  }
};
