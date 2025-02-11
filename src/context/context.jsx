import { createContext, useContext, useState, useEffect } from "react";

import { question } from "../lib/testData";

import { db } from "../firebase";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";

//-------------------------------------------------------------
const Ctx = createContext();

//-------------------------------------------------------------
export function useCtx() {
  return useContext(Ctx);
}

//-----------------------------------------------------------
const displayTime = (unit) => {
  return unit < 10 ? `0${unit}` : unit;
};

//-----------------------------------------------------------
// radomize the array element - question Id
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
const questionId = question.map((i) => i.id);
shuffleArray(questionId);

//-----------------------------------------------------------
// local storage
const getLocaldata = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

const setLocalData = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

//-----------------------------------------------------------
const dataInit = {
  userName: "",
  uId: "",
  questionId,
  isStart: false,
  questionCounter: 0,
  time: {
    sec: 0,
    min: 0,
    hour: 0,
  },
};

//-------------------------------------------------------------
//-------------------------------------------------------------
export function CtxProvider(props) {
  const [isStart, setIsStart] = useState();
  const [isEnd, setIsEnd] = useState(false);
  const [finalTime, setFinalTime] = useState();
  const [isRestart, setIsRestart] = useState(false);

  //-------------------------------------------------------------

  // set the initial game status
  useEffect(() => {
    const gameStatus = getLocaldata("status");

    if (!gameStatus) {
      setLocalData("status", dataInit);
    }

    if (gameStatus && gameStatus.userName !== "") {
      setLocalData("status", {
        ...gameStatus,
        userName: gameStatus.userName,
      });
    }

    gameStatus && !gameStatus.isStart ? setIsStart(false) : setIsStart(true);
  }, []);

  //-------------------------------------------------------------

  //set the initial local storage when click the Start button
  const startGame = () => {
    setIsStart(true);
    setIsRestart(false);
    const gameStatus = JSON.parse(localStorage.getItem("status"));
    localStorage.setItem(
      "status",
      JSON.stringify({
        ...gameStatus,
        isStart: true,
      })
    );
  };

  //-------------------------------------------------------------
  const handleTurn = async () => {
    setIsEnd(true);
    const gameStatus = getLocaldata("status");

    // set the user name and time to firebase database
    //-----------------------------------------
    // fetch the actual user data
    const getDocId = async (collectionName) => {
      try {
        const querySnapshot = await getDocs(collection(db, collectionName));
        const dataId = querySnapshot.docs.map((doc) => {
          if (doc.data().uId === gameStatus.uId) {
            return {
              data: doc.data(),
              id: doc.id,
            };
          }
        });
        const document = dataId.filter((id) => id);
        return document[0];
      } catch (error) {
        console.log(error);
      }
    };

    const actualDocument = await getDocId("users");

    //--------------------------------------------------------------------
    // firestore update function
    const updateData = async (collectionName, docId, newData) => {
      try {
        const docRef = doc(db, collectionName, docId);
        await updateDoc(docRef, newData);
      } catch (error) {
        console.log(error);
      }
    };
   
    const newDocument = {
      ...actualDocument.data,
      time: gameStatus.time,
    };

    updateData("users", actualDocument.id, newDocument);
  };

  //-------------------------------------------------------------
  const getFinalTime = (time) => {
    setFinalTime(
      `${displayTime(time.hour)}:${displayTime(time.min)}:${displayTime(
        time.sec
      )}`
    );
  };

  //-------------------------------------------------------------
  const restart = () => {
    setIsEnd(false);
    setIsStart(false);
    setIsRestart(true);
    const gameStatus = getLocaldata("status");

    setLocalData("status", {
      ...dataInit,
      userName: gameStatus.userName,
      uId: gameStatus.uId,
    });
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
    isRestart,
  };
  return <Ctx.Provider value={value}>{props.children}</Ctx.Provider>;
}
