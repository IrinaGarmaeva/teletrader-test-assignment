import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import WebSocket from "websocket";

import {
  selectCryptoPairNames,
  selectCryptoPairNamesLoadingStatus,
  selectCryptoPairNamesErrorText,
  getCryptoPairNames,
} from "../../../store/cryptoPairNames/cryptoPairNamesSlice";
import {
  selectAllTickers,
  getTickers,
} from "../../../store/tickers/tickersSlice";
import WrapperTable from "../../design-system/WrapperTable/WrapperTable";
import Table from "../../design-system/Table/Table";
import Preloader from "../../design-system/Preloader/Preloader";
import "./Home.css";

const Home = () => {
  const dispatch = useDispatch();
  const cryptoPairNameLoadingStatus = useSelector(
    selectCryptoPairNamesLoadingStatus
  );
  //const cryptoPairNamesErrorText = useSelector(selectCryptoPairNamesErrorText);


  useEffect(() => {
    dispatch(getCryptoPairNames());
    dispatch(getTickers());
  }, [dispatch]);



  return (
    <section className="home">
      <div className="home__wrapper">
        {cryptoPairNameLoadingStatus ? (
          <Preloader />
        ) : (
          // <Table tickersToDisplay={tickersToDisplay} />
          <WrapperTable />
        )}
      </div>
    </section>
  );
};

export default Home;
