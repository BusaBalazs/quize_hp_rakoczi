import React, { useEffect, useRef } from "react";
import QrScanner from "qr-scanner";

const Reader = ({ scanId }) => {
  const videoRef = useRef(null);
  const scannerRef = useRef(null);
  
  useEffect(() => {
    if (videoRef.current) {
      scannerRef.current = new QrScanner(
        videoRef.current,
        (result) => {
          scanId(result.data);
          scannerRef.current.stop();
        },
        {
          preferredCamera: "environment",
        }
      );
      scannerRef.current.start();
    }
    
    return () => {
      scannerRef.current?.stop();
    };
  }, [scanId]);
  
  return (
    <div>
    <video ref={videoRef} style={{ width: "100%", maxWidth: 500 }} />
    </div>
  );
};

export default Reader;
