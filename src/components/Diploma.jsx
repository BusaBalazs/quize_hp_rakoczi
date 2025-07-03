import React from "react";
import { useNavigate } from "react-router";
//-----------------------------------------------------------------
import downloadjs from "downloadjs";
import html2canvas from "html2canvas";

import { useCtx } from "../context/context";

import { imgWand, imgDiploma } from "../assets";

import classes from "./Diploma.module.css";

//-----------------------------------------------------------------
//-----------------------------------------------------------------
const Diploma = () => {
  const { diplomaData, restart } = useCtx();
  const navigate = useNavigate();

  const handleRestart = () => {
    restart();
    navigate("/");
  };

  //--------------------------------------------------------------
  // downnload diploma
  const handleCapture = async () => {
    const diplomaContainer = document.querySelector("#diploma");

    const canvas = await html2canvas(diplomaContainer, {
      backgroundColor: null,
    });

    const dataURL = canvas.toDataURL("image/png");
    downloadjs(dataURL, "potter.png", "image/png");
  };

  const diplomaTime = diplomaData && {
    hour:
      diplomaData.time.hour < 10
        ? `0${diplomaData.time.hour}`
        : diplomaData.time.hour,
    min:
      diplomaData.time.min < 10
        ? `0${diplomaData.time.min}`
        : diplomaData.time.min,
    sec:
      diplomaData.time.sec < 10
        ? `0${diplomaData.time.sec}`
        : diplomaData.time.sec,
  };
  return (
    <section className={classes["diploma-section-bg"]}>
      <div className="header-contaier">
        <h2>gratulálunk</h2>
        <img src={imgWand} className="magic-wand-img" alt="magic wand" />
      </div>
      <p className={classes["diploma-text"]}>
        Büszkén veheted át a varázsló okleveled:
      </p>
      <div id="diploma" className={classes["diploma-container"]}>
        <img
          className={classes["diploma-img"]}
          src={imgDiploma}
          alt="diploma of success of game play"
        />
        <div className={classes["diploma-text-container"]}>
          <p
            className={classes["diploma-name"]}
            style={{ fontFamily: '"Cinzel Decorative", serif' }} //use inline style because of HTML2canvas
          >
            {diplomaData && diplomaData.userName}
          </p>
          <p style={{ fontFamily: '"Cinzel Decorative", serif' }}></p>
          <p
            style={{
              fontFamily: '"Cinzel Decorative", serif',
              fontWeight: "700",
              textWrap: "balance",
              marginTop: "1.5em",
            }}
          >
            <span
              className={classes["time"]}
              style={{
                fontFamily: '"Cinzel Decorative", serif',
                fontWeight: "700",
              }}
            >
              {diplomaData &&
                `${diplomaTime.hour}:${diplomaTime.min}:${diplomaTime.sec}`}
            </span>{" "}
            idő alatt teljesítetted a feladatokat
          </p>
        </div>
      </div>
      <p className={classes["link-paragraph"]}>
        A Diplomát letöltheted:{" "}
        <span className={classes["download-link"]} onClick={handleCapture}>
          INNEN!
        </span>
      </p>

      <button
        onClick={handleRestart}
        className={`${classes["leader-board-btn"]} btn`}
      >
        ok
      </button>
    </section>
  );
};

export default Diploma;
