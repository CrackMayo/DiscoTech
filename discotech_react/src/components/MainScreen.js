import React from "react";
import List from "./List";
import { useState, useEffect } from "react";
import CreateDisco from "../components/CreateDisco";
import Disco from "../components/Disco";
import Account from "./Account";
import Footer from "./Footer";
import Bookings from "./Bookings";
import WeekDeals from "../components/WeekDeals";

const MainScreen = ({ handleLogOut }) => {
  const [screen, setScreen] = useState(0);
  const [disco, setDisco] = useState("");

  const handleShowDiscoCreatePage = () => {
    setScreen(1);
  };

  const handleShowMain = () => {
    setScreen(0);
  };

  const handleShowAccount = () => {
    setScreen(3);
  };

  const handleShowWeekDeals = () => {
    setScreen(4);
  };
  const handleShowBookings = () => {
    setScreen(5);
  };
  return (
    <section className="mainScreen">
      <nav>
        <h2 onClick={handleShowMain}>
          <b>DiscoTech</b>
        </h2>

        <a className="aStyle" href="#" onClick={handleShowDiscoCreatePage}>
          Add Disco
        </a>
        <a className="aStyle" href="#" onClick={handleShowBookings}>
          Bookings
        </a>
        <a className="aStyle" href="#" onClick={handleShowWeekDeals}>
          Week Deals
        </a>
        <a className="aStyle" href="#" onClick={handleShowAccount}>
          My Account
        </a>

        <button onClick={handleLogOut}>Logout</button>
      </nav>
      {screen === 1 ? (
        <CreateDisco />
      ) : screen === 2 ? (
        <Disco disco={disco} setDisco={setDisco} />
      ) : screen === 3 ? (
        <Account />
      ) : screen === 4 ? (
        <WeekDeals/>
      ) : screen === 5 ? (
        <Bookings />
      ) : (
        <List
          screen={screen}
          setScreen={setScreen}
          disco={disco}
          setDisco={setDisco}
        />
      )}
      <div className = "wall"></div>
      <Footer />
    </section>
  );
};

export default MainScreen;
