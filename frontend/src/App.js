import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/modules/Header";
import Footer from "./components/modules/Footer";
import Helper from "./components/modules/Helper";
import Task from "./components/modules/Task";
import ImgComp from "./components/modules/ImgComp";
import ClipBoard from "./components/modules/ClipBoard";
import CodeStore from "./components/modules/CodeStore";
import FileUpload from "./components/modules/FileUpload";
import loaderGif from "../src/assets/doggy.gif";
import QRGenerator from "./components/modules/QRGenerator";
import NotFound from "./components/modules/NotFound";
import Hangman from "./components/modules/Hangman";
import DueTracker from "./components/modules/DueTracker";

const App = () => {
  const [loaderShow, setLoaderShow] = useState(false);
  const [alertMsg, setAlertMsg] = useState({
    message: "",
    type: "alert-primary",
  });

  const showAlertMsg = (msg, type) => {
    setAlertMsg({
      message: msg,
      type: type,
    });
    document.getElementById("root").scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setTimeout(() => {
      setAlertMsg({
        message: "",
        type: "alert-primary",
      });
    }, 2000);
  };

  return (
    <Router>
      <Header />
      <div className="container">
        {loaderShow && (
          <div className="text-center loaderScreen">
            <img src={loaderGif} alt="loading" />
          </div>
        )}
        {alertMsg.message !== "" && (
          <div className={`alert ${alertMsg.type}`} role="alert">
            {alertMsg.message}
          </div>
        )}
        <Routes>
          <Route path="/" element={<Helper />} />
          <Route path="task" element={<Task />} />
          <Route path="img-comp" element={<ImgComp />} />
          <Route path="code-store" element={<CodeStore />} />
          <Route path="clip-board" element={<ClipBoard />} />
          <Route
            path="file-upload"
            element={<FileUpload setLoaderShow={setLoaderShow} showAlertMsg={showAlertMsg} />}
          />
          <Route path="qr-generate" element={<QRGenerator showAlertMsg={showAlertMsg}/>}/>
          <Route path="due-tracker" element={<DueTracker />} />
          <Route path="hangman" element={<Hangman />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
