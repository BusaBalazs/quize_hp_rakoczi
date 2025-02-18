import React, {
  useRef,
  useImperativeHandle,
  forwardRef,
  useState,
} from "react";

import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebase";

import { v4 as uuidv4 } from "uuid";
//-------------------------------------------------------
import classes from "./UserName.module.css";

//-------------------------------------------------------
// user name checking function
//
const userNameIsOk = (str, forbiddenName) => {
  // check if devided the forbidden word
  let string = str
    .normalize("NFD")
    .replace(/[\u0300-\u036f\s+]/g, "")
    .toLowerCase();
  const checkByCharacter = string.trim().split("").join("");

  //--------------------------------------------------------
  // check by words
  const bStr = str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
  const checkByWords = bStr.trim().split(" ");

  return {
    byChr: forbiddenName.includes(checkByCharacter),
    byWord: forbiddenName.filter((value) => checkByWords.includes(value)),
  };
};

const forbiddenUserName = [
  "fasz",
  "faszom",
  "kurva",
  "anyad",
  "anyadat",
  "azanyadat",
  "kurvaanyad",
  "akurvaanyad",
  "kurvaanyadat",
  "akurvaanyadat",
  "kocsog",
  "pina",
  "picsa",
  "picsaba",
  "picsafasz",
  "bazdmeg",
  "basszameg",
  "baszameg",
  "megbassza",
  "megbasza",
  "baszik",
  "baszo",
  "anyabaszo",
  "lofasz",
  "hulyepicsa",
  "segg",
  "seg",
  "hujepicsa",
  "faszallito",
  "faszalito",
  "pinagyar",
  "anusz",
  "segbekur",
  "seggbekur",
  "elmeszteapicsaba",
  "geci",
  "gecilada",
];

//-------------------------------------------------------
//-------------------------------------------------------
const UserName = forwardRef(({}, ref) => {
  const dialog = useRef();
  const userName = useRef();

  const [warning, setWarning] = useState(false);
  const [forbiddenName, setForbiddenName] = useState(false);

  //-------------------------------------------------------
  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
      close() {
        dialog.current.close();
      },
    };
  });

  //-------------------------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = uuidv4();
    //-----------------------------------------------------
    // check user name validation
    const checkUserName = userNameIsOk(
      userName.current.value,
      forbiddenUserName
    );

    if (checkUserName.byChr || checkUserName.byWord.length !== 0) {
      console.log("running");
      setForbiddenName(true);
      return;
    }
    // set user name if it is ok
    const getUserName = userName.current.value;

    //-------------------------------------------------------------
    // save data to local storage
    const gameStatus = JSON.parse(localStorage.getItem("status"));
    localStorage.setItem(
      "status",
      JSON.stringify({
        ...gameStatus,
        userName: getUserName,
        uId: userId,
      })
    );

    dialog.current.close();

    //-------------------------------------------------------------
    // save data to firestore
    try {
      await addDoc(collection(db, "users"), {
        userName: getUserName,
        uId: userId,
        createdAt: Timestamp.now(),
      });
    } catch (error) {
      console.log(error);
    }
  };

  //-------------------------------------------------------
  // set back warning, forbidden name to false if the user is typing
  const handleInput = () => {
    setWarning(false);
    setForbiddenName(false);
  };
  
  //-------------------------------------------------------
  return (
    <dialog ref={dialog} className={`${classes["user-name-modal"]} modal`}>
      <form onSubmit={handleSubmit}>
        <div className={classes["input-container"]}>
          <input
            ref={userName}
            type="text"
            required
            onInput={handleInput}
            className={classes["user-input"]}
          />
          <label className={classes["label"]} htmlFor="userName">
            Varázsló nevem:
          </label>
        </div>
        <button type="submit">OK</button>
      </form>
    </dialog>
  );
});

export default UserName;
