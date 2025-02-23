import React, { useEffect, useRef } from "react";

import { gsap } from "gsap/gsap-core";

import UserName from "./UserName.jsx";
import Leaderboard from "./Leaderboard.jsx";
import { useCtx } from "../context/context";

import classes from "./Start.module.css";
//----------------------------------------------------------

import { imgWand, imgSnitch } from "../assets/index.js";
//-------------------------------------------------------
//-------------------------------------------------------
const Start = () => {
  const dialog = useRef();
  const leaderboard = useRef();

  //from context.jsx
  const { startGame } = useCtx();

  useEffect(() => {
    const getLocalData = JSON.parse(localStorage.getItem("status"));
    if (getLocalData && getLocalData.userName === "") {
      dialog.current.open();
    }
  }, []);

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
        { scale: 1, opacity: 1, ease: "back.out", delay: 0.5, x: 0 }
      );

      gsap.fromTo(
        ".btn-gsap",
        {
          x: -50,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          stagger: 0.2,
          ease: "back.out",
          delay: 0.6,
        }
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
  const handleClick = () => {
    startGame();
  };

  //-----------------------------------------------------------

  const handleUserNameBtn = () => {
    dialog.current.open();
  };

  const handleScoreList = () => {
    leaderboard.current.open();
  };

  //-----------------------------------------------------------
  return (
    <>
      <UserName ref={dialog} />
      <Leaderboard ref={leaderboard} />
      <section className={classes["start-page"]}>
        <div onClick={handleClick} className={classes["btn-container"]}>
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
        <div className={classes["function-btns-container"]}>
          <div className={`${classes["function-btn"]} btn-gsap`}>
            <button
              className={classes["chose-username-btn"]}
              onClick={handleScoreList}
            >
              Ranglista
            </button>
            <img
              src={imgWand}
              className={`${classes["magic-wand-img"]}`}
              alt="magic wand"
            />
          </div>
          <div className={`${classes["function-btn"]} btn-gsap`}>
            <button
              className={classes["chose-username-btn"]}
              onClick={handleUserNameBtn}
            >
              Új nevet választok
            </button>
            <img
              src={imgWand}
              className={`${classes["magic-wand-img"]}`}
              alt="magic wand"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Start;
