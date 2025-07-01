import React, { useEffect } from "react";
import { Html5QrcodeScanner, Html5QrcodeScanType } from "html5-qrcode";

//----------------------------------------------------------------------
//----------------------------------------------------------------------
const CONFIG = {
  qrbox: { width: 500, height: 800 },
  fps: 5,
  videoConstraints: {
    facingMode: { exact: "environment" },
  },
  rememberLastUsedCamera: true,
  supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
};

//----------------------------------------------------------------------
//----------------------------------------------------------------------

const Reader = ({ scanId }) => {
  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", CONFIG);

    scanner.render(success, error);

    function success(result) {
      scanner.clear();
      scanId(result); // triger this function to Question.jsx throught the Modal.jsx
    }

    function error(err) {
      console.warn(err);
    }

     // Change button text after the scanner is rendered
     const interval = setInterval(() => {
      const requestCamerButton = document.querySelector(
        "#html5-qrcode-button-camera-permission"
      );
      const startButton = document.querySelector("#html5-qrcode-button-camera-start");
      const stopButton = document.querySelector("#html5-qrcode-button-camera-stop");

      if (requestCamerButton) {
        requestCamerButton.textContent = "Kamera Engedélyezése";

        clearInterval(interval);
      }

      if (startButton) {
        startButton.textContent = "Beolvasás Kezdés";
        clearInterval(interval);
      }

      if (stopButton) {
        stopButton.textContent = "Beolvasás Megállítás";
        clearInterval(interval);
      }
    }, 100);

    return () => {
      scanner.clear();
      clearInterval(interval); // Cleanup interval on component unmount
    };
  }, []);

  return (
    <>
      <div id="reader"></div>
    </>
  );
};

export default Reader;
