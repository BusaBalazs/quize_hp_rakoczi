import React, {
  useImperativeHandle,
  forwardRef,
  useRef,
  useEffect,
  useState,
} from "react";
//---------------------------------------------------------
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
//---------------------------------------------------------

import classes from "./Leaderboard.module.css";

//---------------------------------------------------------
//---------------------------------------------------------
const Leaderboard = forwardRef(({}, ref) => {
  const dialog = useRef();
  const [leaderboardData, setLeaderboardData] = useState([]);

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

  useEffect(() => {
    // fetch the actual user data
    const getDocId = async (collectionName) => {
      try {
        const querySnapshot = await getDocs(collection(db, collectionName));
        const actualDocument = querySnapshot.docs.map((doc) => doc.data());
        setLeaderboardData(actualDocument);
      } catch (error) {
        console.log(error);
      }
    };

    getDocId("users");
  }, []);

  //-------------------------------------------------------
  return (
    <dialog ref={dialog} className={classes["user-name-modal"]}>
      <section>here is the leaderboard</section>
    </dialog>
  );
});

export default Leaderboard;
