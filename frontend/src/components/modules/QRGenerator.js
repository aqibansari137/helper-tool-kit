import React, { useState, useRef } from "react";
import QRCode from "react-qr-code";
import "../styles/QrGenerator.css";

const QRGenerator = () => {
  const [qrText, setQrText] = useState("");
  const [qrCodegen, setQrCodegen] = useState("");
  const [hideIt, setHideIt] = useState(true);
  const qrCodeRef = useRef();

  const generateQRCode = () =>{
    setQrCodegen(qrText);
    setHideIt(false);
  }

  const downloadQRCode = () => {
    const svg = document.querySelector(".code-image svg");
    if (!svg) {
      console.error("SVG element not found");
      return;
    }

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const svgData = new XMLSerializer().serializeToString(svg);
    const img = new Image();
    img.src = "data:image/svg+xml;base64," + btoa(svgData);

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "qr-code.png";
      link.click();
    };

    img.onerror = (error) => {
      console.error("Image loading error", error);
    };
  };

  const resetQRCode = () =>{
    setQrCodegen("");
    setHideIt(true);
    setQrText("")
  }

  return (
    <div className="qr-generator-container">
      <div className="code-image">
        <QRCode
          className={`${hideIt?"hide-it":""}`}
          ref={qrCodeRef}
          size={256}
          style={{ height: "auto", maxWidth: "100%", width: "100%" }}
          value={qrCodegen}
          viewBox={`0 0 256 256`}
        />
      </div>
      <div className="qr-content">
        <h2>QR Generator</h2>
        <input
          type="text"
          value={qrText}
          onChange={(e) => setQrText(e.target.value)}
          placeholder="Enter text or URL"
        />
        <button className="btn-grad" onClick={generateQRCode}>
          Generate
        </button>
        <button onClick={downloadQRCode} className={`btn-grad ${hideIt?"hide-it":""}`}>
          Download
        </button>
        <button onClick={resetQRCode} className={`btn-grad btn-grad-red ${hideIt?"hide-it":""}`}>
          Reset 
        </button>
      </div>
    </div>
  );
};

export default QRGenerator;
