import { toast } from 'react-toastify';
import { Ticker } from 'common/types';
import { SERVER_ERROR_MESSAGE } from 'common/consts';
import axiosRequest from 'common/axios';

type ServerError = Error & { code?: string };

const handleError = (error: any): void => {
  const serverError = error as ServerError;

  const errorMessage = serverError.code === 'ERR_BAD_RESPONSE' ? SERVER_ERROR_MESSAGE : serverError.message;
  toast.error(errorMessage);
  throw error;
};

export const getFirstFiveSymbols = async (): Promise<string[]> => {
  try {
    const symbols = await axiosRequest({ endpoint: '/symbols' });
    return symbols.slice(0, 5).map((symbol: string) => symbol.toUpperCase());
  } catch (error) {
    handleError(error);
    return [];
  }
};

export const getTicker = async (symbol: string): Promise<Ticker | null> => {
  try {
    return await axiosRequest({ endpoint: `/pubticker/${symbol}` });
  } catch (error) {
    handleError(error);
    return null;
  }
};
