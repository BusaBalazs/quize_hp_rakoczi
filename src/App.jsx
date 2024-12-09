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

const App = () => {
  //from context.jsx
  const { isStart, startGame } = useCtx();

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
