import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Cloudinary } from "@cloudinary/url-gen/index";

import Questions from "./components/Questions";

import { useCtx } from "./context/context";

//-----------------------------------------------------------
import classes from "./App.module.css";

import {
  imgWand,
  imgFlagBlue,
  imgFlagBrown,
  imgFlagGreen,
  imgFlagRed,
} from "./assets/index.js";

//-----------------------------------------------------------
//-----------------------------------------------------------
const cld = new Cloudinary({
  cloud: {
    cloudName: "dironarnd",
  },
});

const App = () => {
  const videoRef = useRef();

  //from context.jsx
  const { isStart, startGame, isRestart } = useCtx();

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

        gsap.from("#start-btn", {
          scale: 0.5,
          opacity: 0,
          ease: "expo.out",
          duration: 1.5,
          delay: 0.5,
        });

        gsap.from(".gsap-flag", {
          y: 80,
          opacity: 0,
          delay: 1,
          stagger: 0.2,
          ease: "back.out",
          duration: 1,
        });
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
  useGSAP(() => {
    if (isRestart) {
      gsap.to(".gsap-wand", {
        x: 0,
        scale: 1,
        rotateY: 0,
        rotateZ: 0,
        duration: 1.5,
        ease: "back.inOut",
      });

      gsap.from("#start-btn", {
        scale: 0.5,
        opacity: 0,
        ease: "expo.out",
        duration: 1.5,
        delay: 0.5,
      });

      gsap.from(".gsap-flag", {
        y: 80,
        opacity: 0,
        delay: 1,
        stagger: 0.2,
        ease: "back.out",
        duration: 1,
      });
      videoRef.current.play();

      gsap.to("#video", {
        opacity: 0,
        delay: 1.5,
      });
    }
  }, [isRestart]);

  //-----------------------------------------------------------

  //invoke the startGame function in context.jsx
  const handleClick = () => {
    startGame();
  };
  //-----------------------------------------------------------
  return (
    <>
      {isStart ? (
        <>
          <Questions />
        </>
      ) : (
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
          <div className={classes["flags-container"]}>
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
      )}
    </>
  );
};

export default App;
