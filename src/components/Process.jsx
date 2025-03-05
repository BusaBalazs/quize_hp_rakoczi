import React, { useEffect, useRef } from "react";
import gsap from "gsap";

import { useCtx } from "../context/context";

//-----------------------------------------------------------------
import Timer from "./Timer";
import classes from "./Process.module.css";

//-----------------------------------------------------------------//-----------------------------------------------------------------
const Process = ({ numOfQuestion, numOfAllQuestion }) => {
  const indicator = useRef();
  const { isEnd } = useCtx();

  useEffect(() => {
    const calculatedWidth = ((numOfQuestion + 1) / numOfAllQuestion) * 100;

    gsap.to("#process", {
      width: `${calculatedWidth}%`,
      delay: 1,
    });
  }, [numOfQuestion]);

  //--------------------------------------------------------------
  return (
    <section className={classes["process-container"]}>
      <div className={classes["process-indicator-container"]}>
        <div className={classes["process-lines-container"]}>
          <p className={classes["num-of-question"]}>{`${
            numOfQuestion + 1
          }/${numOfAllQuestion}`}</p>
          <span
            id="process"
            ref={indicator}
            className={classes["process-indicator-blue"]}
          />
          <span className={classes["process-indicator-white"]} />
        </div>
      </div>
    </section>
  );
};

export default Process;
