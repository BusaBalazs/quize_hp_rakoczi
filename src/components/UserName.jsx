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
//-------------------------------------------------------
const UserName = forwardRef(({}, ref) => {
  const dialog = useRef();
  const userName = useRef();

  const [warning, setWarning] = useState(false);

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
    const getUserName = userName.current.value.trim();

    if (getUserName === "") {
      setWarning(true);
      return;
    }

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
  // set warning to false if the user typing name
  const handleInput = () => {
    setWarning(false);
  };
  //-------------------------------------------------------
  return (
    <dialog ref={dialog} className={classes["user-name-modal"]}>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="userName">Válassz varázsló nevet!</label>
          <input
            ref={userName}
            type="text"
            required
            onInput={handleInput}
            className={classes["user-input"]}
          />
        </div>
        <button type="submit">OK</button>
      </form>
    </dialog>
  );
});

export default UserName;
