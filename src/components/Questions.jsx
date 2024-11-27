import React, { useRef, useState } from "react";

import { useCtx } from "../context/context";
import { useLocalStorage } from "../hook/useLocalStorage";
//-----------------------------------------------------------------

import QuestionItem from "./QuestionItem";
import Modal from "./Modal";
import Timer from "./Timer";
//-----------------------------------------------------------------
import classes from "./Questions.module.css";
//-----------------------------------------------------------------


import { question } from "../lib/testData";
import nimbusImg from "../assets/nimbusz_2000.png";

//-----------------------------------------------------------------

// shuffle the answers function
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

question.map((item) => shuffleArray(item.answers));

//-----------------------------------------------------------------
//-----------------------------------------------------------------

const Questions = () => {
  const dialog = useRef();

  const [answerIsTrue, setAnswerIsTrue] = useState(true);

  const btns = useRef([]);

  const { onTurn, isStart, startGame } = useCtx();

  // custom hook for handling local storage
  const [storedValue, setValue] = useLocalStorage("status");

  //---------------------------------------------------------------

  const questionId = question.map((i) => i.id);

  //--------------------------------------------------------------

  //listen every game turn to the last question and invoke the onTurn function in context.jsx

  if (storedValue.questionCounter === question.length) {
    dialog.current.open();
    onTurn();
  }

  //---------------------------------------------------------------

  // check the selected answer and add feedback if it is wrong
  const isOk = (e, index, answer) => {
    if (answer) {
      dialog.current.open();
      setAnswerIsTrue(true);
    } else {
      setAnswerIsTrue(false);
      //setBtn(e.target);
      btns.current[index].style.backgroundColor = "rgba(194, 0, 0, 0.7)";
      setTimeout(() => {
        btns.current[index].style.backgroundColor = "";
        setAnswerIsTrue(true);
      }, 1500);
    }
  };

  //---------------------------------------------------------------
  const handlCancel = () => {
    dialog.current.close();
  };

  //--------------------------------------------------------------

  // check the QR code, and set the next question if the code is right
  const handleGetScanId = (result) => {
    dialog.current.close();
    if (result === questionId[storedValue.questionCounter]) {
      let testCounter = storedValue.questionCounter;
      testCounter++;
      setValue({ ...storedValue, questionCounter: testCounter });
    } else {
      dialog.current.open();
    }
  };

  //--------------------------------------------------------------

  const handleTest = () => {
    let testCounter = storedValue.questionCounter;
    testCounter++;
    setValue({ ...storedValue, questionCounter: testCounter });
  };

  //--------------------------------------------------------------
  return (
    <>
      <Modal
        ref={dialog}
        onCancel={handlCancel}
        getScanId={handleGetScanId}
      />
      {question[storedValue.questionCounter] && (
        <section
          className={`${classes["container"]} ${
            classes[`bg-${storedValue.questionCounter + 1}`]
          } ${classes["landscape-bg"]}`}
        >
          <div className={classes["question-container"]}>
            <img
              src={nimbusImg}
              alt="nimbusz 2000"
              className={classes["nimbus-img"]}
            />
            <div className={classes["question"]}>
              <h2>{question[storedValue.questionCounter].question}</h2>
              <code>{question[storedValue.questionCounter].operation}</code>
            </div>
          </div>
          <ul className={classes.list}>
            {question[storedValue.questionCounter].answers.map((item, i) => (
              <QuestionItem
                key={item.answer}
                CheckAnswer={(e, index = i) => isOk(e, index, item.right)}
                isDisabled={!answerIsTrue ? true : false}
                ref={(el) => (btns.current[i] = el)}
              >
                {item.answer}
              </QuestionItem>
            ))}
          </ul>
          <div className={classes["timer-container"]}>
            <Timer className={classes["timer-display"]} isStart={isStart} />
          </div>
          <div className={classes.test}>
            <button onClick={handleTest}>test btn</button>
            <p>{storedValue.questionCounter}</p>
          </div>
        </section>
      )}
    </>
  );
};

export default Questions;
