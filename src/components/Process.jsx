import React from "react";
import { useCtx } from "../context/context";

import Timer from "./Timer";
//-----------------------------------------------------------------
import classes from "./Process.module.css";

//-----------------------------------------------------------------//-----------------------------------------------------------------
const Process = ({ numOfQuestion }) => {
  const { isEnd } = useCtx();
  return (
    <section className={classes["process-container"]}>
      <div className={classes["timer-container"]}>
        <Timer className={classes["timer-display"]} isEnd={isEnd} />
      </div>
      <div className={classes["process-indicator-container"]}>
        <p className={classes["num-of-question"]}>{numOfQuestion}</p>
        <div>process</div>
      </div>
    </section>
  );
};

export default Process;
