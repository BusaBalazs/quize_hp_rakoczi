import React, {
  useImperativeHandle,
  useRef,
  forwardRef,
  useState,
} from "react";

//-----------------------------------------------------------------

import { useCtx } from "../context/context.jsx";

import Reader from "./Reader.jsx";

import classes from "./Modal.module.css";

import mapImg from "../assets/rakoczi_map.jpg";
//-----------------------------------------------------------------
//-----------------------------------------------------------------

const Modal = forwardRef(({ onCancel, answer, getScanId }, ref) => {
  const dialog = useRef();
  const [isScan, setIsScan] = useState(false);
  const { isEnd, finalTime, restart } = useCtx();
  //-----------------------------------------------------------------
  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
      close() {
        setIsScan(false);
        dialog.current.close();
      },
    };
  });

  const handlScan = () => {
    setIsScan(true);
  };

  const handleScanId = (result) => {
    getScanId(result);
  };

  const handleRestart = () => {
    restart();
  };

  const handleClick = (e) => {
    if (e.target.tagName !== "DIV" && e.target.tagName !== "DIALOG")
      //This prevents issues with forms
      return;
    dialog.current.close();
  };
  //-----------------------------------------------------------------
  return (
    <dialog
      className={classes.modal}
      ref={dialog}
      onClick={(e) => {
        handleClick(e);
      }}
    >
      <div className={classes["modal-content"]}>
        {isScan && <Reader scanId={handleScanId} />}
        {!isScan && !isEnd && (
          <>
            <div>{answer}</div>
            <img src={mapImg} alt="" />
            <div>
              <button onClick={handlScan}>QR kód</button>
              {!isEnd && <button onClick={onCancel}>Vissza</button>}
            </div>
          </>
        )}
        {isEnd && (
          <>
            <button onClick={handleRestart}>Restart</button>
            <p>Szuper vagy!</p>
            {finalTime && <p>{`Az időd: ${finalTime}`}</p>}
          </>
        )}
      </div>
    </dialog>
  );
});

export default Modal;
