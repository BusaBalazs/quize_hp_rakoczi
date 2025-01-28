import { useEffect, useRef } from "react";


import Questions from "./components/Questions";
import Start from "./components/Start.jsx";
import { useCtx } from "./context/context";

//-----------------------------------------------------------



//-----------------------------------------------------------
//-----------------------------------------------------------


const App = () => {
  

  //from context.jsx
  const { isStart, startGame, isRestart } = useCtx();

  
  //-----------------------------------------------------------
  return (
    <>
      {isStart ? (
        <>
          <Questions />
        </>
      ) : (
        <Start/>
        
      )}
    </>
  );
};

export default App;
