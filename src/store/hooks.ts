import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux';
import { RootState, AppDispatch } from './store';

type DispatchFunction = () => AppDispatch;
export const useTickersDispatch : DispatchFunction = useDispatch;
export const useTickersSelector: TypedUseSelectorHook<RootState> = useSelector;
