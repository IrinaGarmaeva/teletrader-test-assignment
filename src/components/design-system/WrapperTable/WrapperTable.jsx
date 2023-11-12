import Table from "../Table/Table"
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import WebSocket from "websocket";

import { selectCryptoPairNames } from "../../../store/cryptoPairNames/cryptoPairNamesSlice";
import { selectAllTickers, setTickers } from "../../../store/tickers/tickersSlice";


const WrapperTable = () => {
  const dispatch = useDispatch();





  // const getSelectedTickers = () => {
  //   return firstFiveCryptoPairNames.map((cryptoPairName) => {
  //     return allTickers.find((ticker) => ticker[0] === `t${cryptoPairName}`);
  //   });
  // }





}

export default WrapperTable
