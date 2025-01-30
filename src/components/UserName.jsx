import React, {
  useRef,
  useImperativeHandle,
  forwardRef,
  useState,
} from "react";

import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

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
      })
    );

    dialog.current.close();

    try {
      await addDoc(collection(db, "users"), {
        user: getUserName,
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
    <dialog ref={dialog}>
      <form onSubmit={handleSubmit}>
        <label htmlFor="userName">Mi a varázsló neved?</label>
        <input ref={userName} type="text" required onInput={handleInput} />
        <button type="submit">OK</button>
      </form>
    </dialog>
  );
});

export default UserName;
