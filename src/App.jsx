import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import Questions from "./components/Questions";

import { useCtx } from "./context/context";

import video from "./assets/video/test_3.gif"

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

const App = () => {
  //from context.jsx
  const { isStart, startGame } = useCtx();

  //-----------------------------------------------------------
  useGSAP(() => {
    gsap.from(".gsap-wand", {
      x: 130,
      scale: 1.5,
      rotateY: -50,
      rotateZ: 35,
      duration: 1.5,
      ease: "back.inOut",
    });

    gsap.from("#start-btn", {
      scale: .5,
      opacity:0,
      ease: "expo.out",
      duration: 1,
      delay: 1.2
    })

    gsap.from(".gsap-flag", {
      y: 80,
      opacity: 0,
      delay: 1,
      stagger: .2,
      ease: "back.out",
      duration: .5
    });
  }, []);

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
          {/* <img src={video} alt="" /> */}
          <div className={classes["btn-container"]}>
            <button id="start-btn" className={classes["start-btn"]} onClick={handleClick}>
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
