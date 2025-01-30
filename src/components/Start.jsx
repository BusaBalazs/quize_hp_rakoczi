import React, { useEffect, useRef} from "react";

import { gsap } from "gsap/gsap-core";
import { Cloudinary } from "@cloudinary/url-gen/index";

import UserName from "./UserName.jsx";
import { useCtx } from "../context/context";

import classes from "./Start.module.css";
//----------------------------------------------------------
const cld = new Cloudinary({
  cloud: {
    cloudName: "dironarnd",
  },
});

import {
  imgWand,
  imgFlagBlue,
  imgFlagBrown,
  imgFlagGreen,
  imgFlagRed,
} from "../assets/index.js";
//-------------------------------------------------------
//-------------------------------------------------------
const Start = () => {
  const videoRef = useRef();
  const dialog = useRef();

  
  //from context.jsx
  const { startGame } = useCtx();

  useEffect(() => {
    const getLocalData = JSON.parse(localStorage.getItem("status"));
    if (getLocalData.userName === "") {
      dialog.current.open();
    }
  }, []);


  useEffect(() => {
    const loaded = () => {
      if (videoRef.current) {
        gsap.to(".gsap-wand", {
          x: 0,
          scale: 1,
          rotateY: 0,
          rotateZ: 0,
          duration: 1.5,
          ease: "back.inOut",
        });

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
            duration: 1.5,
            delay: 0.5,
          }
        );

        gsap.fromTo(
          ".gsap-flag",
          {
            y: 80,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            delay: 1,
            stagger: 0.2,
            ease: "back.out",
            duration: 1,
          }
        );

        videoRef.current.play();

        gsap.to("#video", {
          opacity: 0,
          delay: 1.5,
        });
      }
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

  return (
    <>
      <UserName ref={dialog} />

      <section className={classes["start-page"]}>
        <video
          id="video"
          ref={videoRef}
          muted
          playsInline={true}
          className={classes.video}
        >
          <source
            src={cld
              .video("rakoczi_kert/qlpa6qizfzkfmbuvlwbp")
              .quality("auto")
              .toURL()}
            type="video/mp4"
          />
        </video>
        <div className={classes["btn-container"]}>
          <button
            id="start-btn"
            className={classes["start-btn"]}
            onClick={handleClick}
          >
            start
          </button>
          <img
            src={imgWand}
            className={`${classes["magic-wand-img"]} gsap-wand`}
            alt="magic wand"
          />
        </div>
        <div className={`${classes["flags-container"]}`}>
          <img
            className={`${classes["flag-img"]} gsap-flag`}
            src={imgFlagBrown}
            alt="brown flag"
          />
          <img
            className={`${classes["flag-img"]} ${classes["flag-midle"]} gsap-flag`}
            src={imgFlagBlue}
            alt="blue flag"
          />
          <img
            className={`${classes["flag-img"]} ${classes["flag-midle"]} gsap-flag`}
            src={imgFlagRed}
            alt="red flag"
          />
          <img
            className={`${classes["flag-img"]} gsap-flag`}
            src={imgFlagGreen}
            alt="green flag"
          />
        </div>
      </section>
    </>
  );
};

export default Start;
