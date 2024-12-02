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

    return () => {
      scanner.clear();
    };
  }, []);

  return (
    <>
      <div id="reader"></div>
    </>
  );
};

export default Reader;
