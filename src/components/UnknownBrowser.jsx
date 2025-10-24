import React, { useState } from "react";


//******************************************************
const UnknownBrowser = () => {
  const [isCopy, setIsCopy] = useState(false);

  // Check if the browser is one of the specified ones
  const copyToClipboard = () => {
    const url = "https://hp-rakoczi.netlify.app/";
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard
        .writeText(url)
        .then(() => setIsCopy(true))
        .catch(() => fallbackCopy());
    } else {
      fallbackCopy();
    }

    function fallbackCopy() {
      // Create a temporary input to select and copy
      const tempInput = document.createElement("input");
      tempInput.value = url;
      document.body.appendChild(tempInput);
      tempInput.select();
      try {
        document.execCommand("copy");
        setIsCopy(true);
      } catch (err) {
        setIsCopy(false);
        alert("Másold ki a linket kézzel: " + url);
      }
      document.body.removeChild(tempInput);
    }
  };

  //------------------------------------------------------
  return (
    <div className="wrong-browser-container">
      <div id="hero-gsap" className="wrong-browser-content">
        <h1>NEM TÁMOGATOTT BÖNGÉSZŐ</h1>
        <p>
          Olyan böngészőt használsz, mely nem felel meg ennek az alkalmazásnak a
          futtatásához.
        </p>
        <p>
          Kérlek a "Link másolása" gombbal másold ki a linkek és nyisd meg másik
          böngészőben. Pl.: Chrome, Safari, Firefox, Opera."
        </p>
        <button onClick={copyToClipboard}>Link másolása</button>
        {isCopy && (
          <p className="succes-copy-text">
            Link másolva a vágólapra!
          </p>
        )}
      </div>
    </div>
  );
};

export default UnknownBrowser;
