import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { gsap } from "gsap/gsap-core";

import { useCtx } from "../context/context";
import { detectBrowser } from "./utility/detectBrowser.jsx";

import Leaderboard from "./Leaderboard.jsx";
import UnknownBrowser from "./UnknownBrowser.jsx";
import classes from "./Start.module.css";
//----------------------------------------------------------

import { imgWand, imgSnitch } from "../assets/index.js";
//-------------------------------------------------------
//-------------------------------------------------------
const Start = () => {
  const leaderboard = useRef();
  const navigate = useNavigate();

  const browser = detectBrowser();

  //from context.jsx
  const { startGame, userName } = useCtx();

  useEffect(() => {
    const loaded = () => {
      gsap.fromTo(
        "#start-btn",
        {
          scale: 0.5,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          ease: "expo.out",
          duration: 1,
          delay: 0.3,
        }
      );

      gsap.fromTo(
        "#snitch",
        { scale: 0.5, opacity: 0, x: -50 },
        { scale: 1, opacity: 1, ease: "back.out", delay: 0.8, x: 0 }
      );
    };

    if (document.readyState === "complete") {
      loaded();
    } else {
      window.addEventListener("load", loaded);

      return () => {
        window.removeEventListener("load", loaded);
      };
    }
  }, []);

  //-----------------------------------------------------------

  //invoke the startGame function in context.jsx
  const handleStart = () => {
    startGame();
    navigate("/questions");
  };

  //-----------------------------------------------------------
  return (
    <>
      {!browser ? (
        <UnknownBrowser />
      ) : (
        <section className={classes["start-page"]}>
          <div onClick={handleStart} className={classes["btn-container"]}>
            <button id="start-btn" className={classes["start-btn"]}>
              start
            </button>
            <img
              src={imgSnitch}
              className={`${classes["snitch-img"]}`}
              alt="gold snitch"
              id="snitch"
            />
          </div>
          <div className={classes["welcome-text"]}>
            <h2>Üdv a varázsvilágban!</h2>
            <p>Tedd próbára tudásod a Harry Potter világáról!</p>
            <p>
              Ha jól válaszolsz, jutalmul QR-kód vár rád! Olvasd be, és máris
              jöhet a következő kérdés!
            </p>
          </div>
        </section>
      )}
    </>
  );
};

export default Start;
