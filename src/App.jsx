import { useState } from "react";

import Questions from "./components/Questions";

import Timer from "./components/Timer";

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

const App = () => {
  //from context.jsx
  const { isStart, startGame, isEnd } = useCtx();
  const [questionNum, setQuestionNum] = useState(0)
  //-----------------------------------------------------------

  //invoke the startGame function in context.jsx
  const handleClick = () => {
    startGame();
  };

  const getTurnNum = (num) => {
    setQuestionNum(num);
  };

  //-----------------------------------------------------------
  return (
    <>
      {isStart ? (
        <section
          className={`${classes["container"]} ${
            classes[`bg-${questionNum + 1}`]
          } ${classes["landscape-bg"]}`}
        >
          <Questions gameTurn={getTurnNum} />
          <div className={classes["timer-container"]}>
            <Timer className={classes["timer-display"]} isEnd={isEnd} />
          </div>
        </section>
      ) : (
        <section className={classes["start-page"]}>
          <div className={classes["btn-container"]}>
            <button className={classes["start-btn"]} onClick={handleClick}>
              start
            </button>
            <img
              src={imgWand}
              className={classes["magic-wand-img"]}
              alt="magic wand"
            />
          </div>
          <div className={classes["flags-container"]}>
            <img
              className={classes["flag-img"]}
              src={imgFlagBrown}
              alt="brown flag"
            />

            <img
              className={`${classes["flag-img"]} ${classes["flag-midle"]}`}
              src={imgFlagBlue}
              alt="blue flag"
            />
            <img
              className={`${classes["flag-img"]} ${classes["flag-midle"]}`}
              src={imgFlagRed}
              alt="red flag"
            />

            <img
              className={classes["flag-img"]}
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
