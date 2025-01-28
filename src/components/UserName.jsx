import React, { useRef, useImperativeHandle, forwardRef } from "react";

//-------------------------------------------------------
//-------------------------------------------------------
const UserName = forwardRef(({ }, ref) => {
  const dialog = useRef();
  const userName = useRef();

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

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const gameStatus = JSON.parse(localStorage.getItem("status"));

    localStorage.setItem(
      "status",
      JSON.stringify({
        ...gameStatus,
        userName: userName.current.value,
      })
    );

    dialog.current.close();
  };

  //-------------------------------------------------------
  return (
    <dialog ref={dialog}>
      <form onSubmit={handleSubmit}>
        <label htmlFor="userName">Mi a varázsló neved?</label>
        <input ref={userName} type="text" required />
        <button type="submit">OK</button>
      </form>
    </dialog>
  );
});

export default UserName;
