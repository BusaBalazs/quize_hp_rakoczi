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

//calculate the user's time in milisec
const milisecTimes = (hour, min, sec) => {
  return (hour * 3600 + min * 60 + sec) * 1000;
};

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
    // fetch the actual users data
    const getDocId = async (collectionName) => {
      try {
        const querySnapshot = await getDocs(collection(db, collectionName));
        const documents = querySnapshot.docs.map((doc) => doc.data());

        // get the user name and the time
        const leaderboardUsers = documents.map((item) => {
          const users = {
            user: item.userName,
            time: item.time,
            milisec: milisecTimes(item.time.hour, item.time.min, item.time.sec),
            uId: item.uId,
          };

          return users;
        });

        // sort data by time
        leaderboardUsers.sort((a, b) => a.milisec - b.milisec);

        setLeaderboardData(leaderboardUsers);
      } catch (error) {
        console.log(error);
      }
    };

    getDocId("users");
  }, []);

  //-------------------------------------------------------
  return (
    <dialog ref={dialog} className={`modal`}>
      <section>
        <ul>
          {leaderboardData.map((item) => (
            <li key={item.uId}>
              <div>
                <span>{item.user} - </span>
                <span>{`${item.time.hour}:${item.time.min}:${item.time.sec}`}</span>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </dialog>
  );
});

export default Leaderboard;
