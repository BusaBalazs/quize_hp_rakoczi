import React, { useRef, useState, useEffect, useLayoutEffect } from "react";
import { useNavigate } from "react-router";
import gsap from "gsap";

import { useCtx } from "../context/context";

//-----------------------------------------------------------------
import downloadjs from "downloadjs";
import html2canvas from "html2canvas";

//-----------------------------------------------------------------
import QuestionItem from "./QuestionItem";
import Modal from "./Modal";
import Process from "./Process";
import Timer from "./Timer";
//-----------------------------------------------------------------
import classes from "./Questions.module.css";

//-----------------------------------------------------------------
import { question } from "../lib/testData";
import { ANSWER_FEEDBACK, QR_FEEDBACK } from "../lib/constatnt";
import {
  imgNimbus as nimbusImg,
  imgWand,
  imgDiploma,
  mandrakeSound,
} from "../assets";

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
//-----------------------------------------------------------------
const Questions = () => {
  const dialog = useRef();
  const navigate = useNavigate();

  const [answerIsTrue, setAnswerIsTrue] = useState(true);
  const [questionNum, setQuestionNum] = useState(0);
  const [feedback, setFeedback] = useState(ANSWER_FEEDBACK);
  const [questionId, setQuestionId] = useState([]);
  const [diplomaData, setDiplomaData] = useState();

  const btns = useRef([]);
  const questionRef = useRef();
  const { onTurn, isEnd, restart } = useCtx();

  //---------------------------------------------------------------

  //--------------------------------------------------------------
 
  useEffect(() => {
    const getStatus = getLocaldata("status");
    let getCounter = getStatus.questionCounter;
    let gameEnd = getStatus.gameEnd
    // when the page loded or reloaded this useEffect set the actual question number, if the game just has begun set the first question
    if (getCounter === 0) {
      setQuestionNum(0);
    } else {
      setQuestionNum(getCounter);
    }

    //listen every game turn to the last question and invoke the onTurn function in context.jsx
    
    if (gameEnd && getCounter + 1 === question.length) {
      onTurn();
    }

    setQuestionId(getStatus.questionId);

    // set the time for diploma data
    setDiplomaData({
      userName: getStatus.userName,
      time: getStatus.time,
    });
  }, []);

  //--------------------------------------------------------------

  useLayoutEffect(() => {
    if (!isEnd) {
      const container = questionRef.current;
      let ctx;
      if (questionNum >= 0) {
        gsap.to(".answer-gsap", {
          x: 0,
          opacity: 1,
          ease: "power1.inOut",
          duration: 0.4,
          stagger: 0.4,
          delay: 0.7,
        });

        ctx = gsap.context(() => {
          gsap.from(container, {
            y: -50,
            opacity: 0,
            duration: 1,
            delay: 0.2,
            ease: "bounce.out",
          });
        });
      }
      return () => ctx.revert();
    }
  }, [questionNum]);

  //--------------------------------------------------------------

  // check the selected answer and add feedback if it is wrong
  const isOk = (e, index, answer) => {
    if (answer) {
      dialog.current.open();
      setAnswerIsTrue(true);
    } else {
      setAnswerIsTrue(false);
      //setBtn(e.target);
      if (questionNum === 6) {
        new Audio(mandrakeSound).play();
        btns.current[index].style.backgroundColor = "rgba(194, 0, 0, 0.7)";
        setTimeout(() => {
          btns.current[index].style.backgroundColor = "";
          setAnswerIsTrue(true);
        }, 4500);
        return;
      }
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
    if (parseInt(result) === questionId[questionNum]) {
      try {
        const getStatus = getLocaldata("status");
        let getCounter = getStatus.questionCounter;
        getCounter++;

        setLocalData("status", { ...getStatus, questionCounter: getCounter });

        //listen every game turn to the last question and invoke the onTurn function in context.jsx
        if (getCounter === question.length) {
          //dialog.current.open();
          setDiplomaData({
            userName: getStatus.userName,
            time: getStatus.time,
          });
          onTurn();
          setQuestionNum(getCounter - 1);
          getCounter--;
          setLocalData("status", { ...getStatus, questionCounter: getCounter });
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
        //dialog.current.open();
        setDiplomaData({
          userName: getStatus.userName,
          time: getStatus.time,
        });
        setQuestionNum(getCounter - 1);
        getCounter--;
        setLocalData("status", { ...getStatus, questionCounter: getCounter });
        onTurn();
        return;
      }

      setQuestionNum(getCounter);
    } catch (error) {
      console.log(error);
    }
  };

  //--------------------------------------------------------------
  const handleRestart = () => {
    restart();
    navigate("/");
  };

  //--------------------------------------------------------------
  // downnload diploma
  const handleCapture = async () => {
    const diplomaContainer = document.querySelector("#diploma");

    const canvas = await html2canvas(diplomaContainer, {
      backgroundColor: null,
    });

    const dataURL = canvas.toDataURL("image/png");
    downloadjs(dataURL, "potter.png", "image/png");
  };

  const diplomaTime = diplomaData && {
    hour:
      diplomaData.time.hour < 10
        ? `0${diplomaData.time.hour}`
        : diplomaData.time.hour,
    min:
      diplomaData.time.min < 10
        ? `0${diplomaData.time.min}`
        : diplomaData.time.min,
    sec:
      diplomaData.time.sec < 10
        ? `0${diplomaData.time.sec}`
        : diplomaData.time.sec,
  };
  //--------------------------------------------------------------
  return (
    <>
      <Modal
        ref={dialog}
        onCancel={handlCancel}
        getScanId={handleGetScanId}
        modalText={feedback}
        actualQuestionNum={questionNum}
      />

      {!isEnd ? (
        <section
          className={`${classes["container"]} ${classes[`bg-${questionNum}`]}`}
        >
          <div>
            <Process
              numOfQuestion={questionNum}
              numOfAllQuestion={question.length}
            />
          </div>
          <div className={classes["question-section"]}>
            <div
              ref={questionRef}
              id="question-gsap"
              className={classes["question-container"]}
            >
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
                  className="answer-gsap"
                >
                  {item.answer}
                </QuestionItem>
              ))}
            </ul>
            <Timer className={classes["timer-display"]} isEnd={isEnd} />
          </div>

          <div className={classes.test}>
            <button onClick={handleTest}>{questionId[questionNum]}</button>
          </div>
        </section>
      ) : (
        <section className={classes["diploma-section-bg"]}>
          <div className="header-contaier">
            <h2>gratulálunk</h2>
            <img src={imgWand} className="magic-wand-img" alt="magic wand" />
          </div>
          <p className={classes["diploma-text"]}>
            Büszkén veheted át a varázsló okleveled:
          </p>
          <div id="diploma" className={classes["diploma-container"]}>
            <img
              className={classes["diploma-img"]}
              src={imgDiploma}
              alt="diploma of success of game play"
            />
            <div className={classes["diploma-text-container"]}>
              <p
                className={classes["diploma-name"]}
                style={{ fontFamily: '"Cinzel Decorative", serif' }} //use inline style because of HTML2canvas
              >
                {diplomaData && diplomaData.userName}
              </p>
              <p style={{ fontFamily: '"Cinzel Decorative", serif' }}></p>
              <p
                style={{
                  fontFamily: '"Cinzel Decorative", serif',
                  fontWeight: "700",
                  textWrap: "balance",
                  marginTop: "1.5em",
                }}
              >
                <span
                  className={classes["time"]}
                  style={{
                    fontFamily: '"Cinzel Decorative", serif',
                    fontWeight: "700",
                  }}
                >
                  {diplomaData &&
                    `${diplomaTime.hour}:${diplomaTime.min}:${diplomaTime.sec}`}
                </span>{" "}
                idő alatt teljesítetted a feladatokat
              </p>
            </div>
          </div>
          <p className={classes["link-paragraph"]}>
            A Diplomát letöltheted:{" "}
            <span className={classes["download-link"]} onClick={handleCapture}>
              INNEN!
            </span>
          </p>

          <button
            onClick={handleRestart}
            className={`${classes["leader-board-btn"]} btn`}
          >
            ok
          </button>
        </section>
      )}
    </>
  );
};

export default Questions;
