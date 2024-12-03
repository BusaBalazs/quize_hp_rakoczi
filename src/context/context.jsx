import { createContext, useContext, useState, useEffect } from "react";

//-------------------------------------------------------------
const Ctx = createContext();

//-------------------------------------------------------------
export function useCtx() {
  return useContext(Ctx);
}

//-------------------------------------------------------------
//-------------------------------------------------------------
export function CtxProvider(props) {
  const [isStart, setIsStart] = useState();
  const [isEnd, setIsEnd] = useState(false);
  const [finalTime, setFinalTime] = useState();

  //-------------------------------------------------------------

  //if local storage is empty the game has not begun yet
  useEffect(() => {
    const gameStatus = localStorage.getItem("status");
    !gameStatus ? setIsStart(false) : setIsStart(true);
  }, []);

  //-------------------------------------------------------------

  //set the initial local storage when click the Start button
  const startGame = () => {
    setIsStart(true);
    localStorage.setItem(
      "status",
      JSON.stringify({
        isStart: "true",
        questionCounter: 0,
        time: {
          sec: 0,
          min: 0,
          hour: 0,
        },
      })
    );
  };

  //-------------------------------------------------------------
  const handleTurn = () => {
    setIsEnd(true);
  };

  //-------------------------------------------------------------
  const getFinalTime = (time) => {
    setFinalTime(time);
  };

  //-------------------------------------------------------------
  const restart = () => {
    setIsEnd(false);
    setIsStart(false);
    window.localStorage.removeItem("status");
  };

  //-------------------------------------------------------------
  const value = {
    isStart,
    startGame,
    onTurn: handleTurn,
    isEnd,
    getFinalTime,
    finalTime,
    restart,
  };
  return <Ctx.Provider value={value}>{props.children}</Ctx.Provider>;
}
