import React, { useState, useRef } from "react";
import QRCode from "react-qr-code";
import "../styles/QrGenerator.css";

const QRGenerator = ({ showAlertMsg }) => {
  const [qrText, setQrText] = useState("");
  const [qrCodegen, setQrCodegen] = useState("");
  const [hideIt, setHideIt] = useState(true);
  const qrCodeRef = useRef();

  const generateQRCode = () => {
    if (qrText !== "") {
      setQrCodegen(qrText);
      setHideIt(false);
    } else {
      showAlertMsg("Input Field is Empty!", "alert-danger");
    }
  };

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

    const padding = 20; // Set the desired padding in pixels

    img.onload = () => {
      const imgWidth = img.width;
      const imgHeight = img.height;
      canvas.width = imgWidth + padding * 2;
      canvas.height = imgHeight + padding * 2;
      ctx.fillStyle = "#ffffff"; // Background color for padding
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, padding, padding, imgWidth, imgHeight);
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "qr-code.png";
      link.click();
    };

    img.onerror = (error) => {
      console.error("Image loading error", error);
    };
  };

  const resetQRCode = () => {
    setQrCodegen("");
    setHideIt(true);
    setQrText("");
  };

  return (
    <>
      <h1 className="text-center mb-4">QR Generator</h1>
      <div className="qr-generator-container">
        <div className="code-image">
          <QRCode
            className={`${hideIt ? "hide-it" : ""}`}
            ref={qrCodeRef}
            size={256}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            value={qrCodegen}
            viewBox={`0 0 256 256`}
          />
        </div>
        <div className="qr-content">
          <h2>Enter text or URL to generate the QR</h2>
          <input
            type="text"
            value={qrText}
            onChange={(e) => setQrText(e.target.value)}
            placeholder="Enter text or URL"
          />
          <div className="btn-container">
            <button className="btn-grad" onClick={generateQRCode}>
              Generate
            </button>
            <button
              onClick={downloadQRCode}
              className={`btn-grad ${hideIt ? "hide-it" : ""}`}
            >
              Download
            </button>
            <button
              onClick={resetQRCode}
              className={`btn-grad btn-grad-red ${hideIt ? "hide-it" : ""}`}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default QRGenerator;
