import React, { useState, useEffect, useRef, useCallback } from "react";
import "./SaleCountDown.css";
import PropTypes from "prop-types";

import { deadline } from "../../constants";
// const deadline = Date.parse(new Date("2021-02-28T18:28:00"));

const SaleCountDown = ({ onFinish }) => {
  // const [sale, setSale] = useState(true);
  const [isStarted, setIsStarted] = useState(false);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const intervalID = useRef(null);

  const finish = useCallback(() => {
    setIsStarted(false);
    onFinish(false);
  }, [onFinish]);

  useEffect(() => {
    setIsStarted(true);
    let total = deadline - Date.parse(new Date());
    if (total > 0) {
      intervalID.current = setInterval(() => {
        total = deadline - Date.parse(new Date());
        setSeconds(Math.floor((total / 1000) % 60));
        setMinutes(Math.floor((total / 1000 / 60) % 60));
        setHours(Math.floor((total / (1000 * 60 * 60)) % 24));
        setDays(Math.floor(total / (1000 * 60 * 60 * 24)));
        if (total <= 0) {
          clearInterval(intervalID.current);
          finish();
        }
      }, 1000);
    } else {
      finish();
    }
    return () => clearInterval(intervalID.current);
  }, [finish, onFinish]);

  return isStarted ? (
    <div className="divCountdown">
      <div className="Text">Final sale on selected items for a limited time</div>
      <div className="Countdown">
        <span className="days">{`0${days}`.slice(-2)}</span>
        <span>:</span>
        <span className="hours">{`0${hours}`.slice(-2)}</span>
        <span>:</span>
        <span className="minutes">{`0${minutes}`.slice(-2)}</span>
        <span>:</span>
        <span className="seconds">{`0${seconds}`.slice(-2)}</span>
      </div>
    </div>
  ) : (
    <div className="divCountdown" style={{ backgroundColor: "#e1deb7" }}>
      <div className="TextSaleOver">The sale is over</div>
    </div>
  );
};

SaleCountDown.propTypes = {
  sale: PropTypes.bool,
  isSale: PropTypes.func,
};

export default SaleCountDown;
