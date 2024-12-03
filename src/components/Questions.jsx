import React, { useRef, useState, useEffect } from "react";

import { useCtx } from "../context/context";

//-----------------------------------------------------------------

import QuestionItem from "./QuestionItem";
import Modal from "./Modal";
import Timer from "./Timer";

//-----------------------------------------------------------------
import classes from "./Questions.module.css";
//-----------------------------------------------------------------

import { question } from "../lib/testData";
import { ANSWER_FEEDBACK, QR_FEEDBACK } from "../lib/constatnt";
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
// local storage functions

const getLocaldata = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

const setLocalData = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};
//-----------------------------------------------------------------
//-----------------------------------------------------------------

const Questions = () => {
  const dialog = useRef();

  const [answerIsTrue, setAnswerIsTrue] = useState(true);
  const [questionNum, setQuestionNum] = useState();
  const [feedback, setFeedback] = useState(ANSWER_FEEDBACK);

  const btns = useRef([]);

  const { onTurn, isEnd } = useCtx();

  //---------------------------------------------------------------

  const questionId = question.map((i) => i.id);

  //--------------------------------------------------------------

  // when the page loded or reloaded this useEffect set the actual question number, if the game just has begun set the first question
  useEffect(() => {
    const getStatus = getLocaldata("status");
    const getCounter = getStatus.questionCounter;
    if (getCounter === 0) {
      setQuestionNum(0);
    } else {
      setQuestionNum(getCounter);
    }
  }, []);

  //--------------------------------------------------------------

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
    if (result === questionId[questionNum]) {
      try {
        const getStatus = getLocaldata("status");
        let getCounter = getStatus.questionCounter;
        getCounter++;

        setLocalData("status", { ...getStatus, questionCounter: getCounter });

        //listen every game turn to the last question and invoke the onTurn function in context.jsx
        if (getCounter === question.length) {
          dialog.current.open();
          onTurn();
          setQuestionNum(getCounter - 1);
          return;
        }
        setQuestionNum(getCounter);
        setFeedback(ANSWER_FEEDBACK);
      } catch (error) {
        console.log(error);
      }
    } else {
      dialog.current.open();
      setFeedback(QR_FEEDBACK);
    }
  };

  //--------------------------------------------------------------

  const handleTest = () => {
    try {
      const getStatus = getLocaldata("status");
      let getCounter = getStatus.questionCounter;
      getCounter++;

      setLocalData("status", { ...getStatus, questionCounter: getCounter });

      //listen every game turn to the last question and invoke the onTurn function in context.jsx
      if (getCounter === question.length) {
        dialog.current.open();
        onTurn();
        setQuestionNum(getCounter - 1);
        return;
      }
      setQuestionNum(getCounter);
    } catch (error) {
      console.log(error);
    }
  };

  // forward the number of question to App.jsx for set the background

  //--------------------------------------------------------------
  return (
    <>
      <Modal
        ref={dialog}
        onCancel={handlCancel}
        getScanId={handleGetScanId}
        modalText={feedback}
      />
      {question[questionNum] && (
        <section
          className={`${classes["container"]} ${classes[`bg-${questionNum}`]}`}
        >
          <div className={classes["question-container"]}>
            <img
              src={nimbusImg}
              alt="nimbusz 2000"
              className={classes["nimbus-img"]}
            />
            <div className={classes["question"]}>
              <h2>{question[questionNum].question}</h2>
              <code>{question[questionNum].operation}</code>
            </div>
          </div>
          <ul className={classes.list}>
            {question[questionNum].answers.map((item, i) => (
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
            <Timer className={classes["timer-display"]} isEnd={isEnd} />
          </div>
          <div className={classes.test}>
            <button onClick={handleTest}>test btn</button>
            <p>{questionNum}</p>
          </div>
        </section>
      )}
    </>
  );
};

export default Questions;
