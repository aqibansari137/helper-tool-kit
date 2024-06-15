import React, { useState, useRef } from "react";
import FileList from "./FileList";
import { uploadFIle } from "../../services/api";
import "../styles/FileUpload.css";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [passcode, setPasscode] = useState("");
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const childRef = useRef();

  // Function to trigger the child's function
  const triggerChildFunction = () => {
    if (childRef.current) {
      childRef.current.fetchFiles();
    }
  };

  const handlePasscodeChange = (e) => {
    setPasscode(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTimeout(() => {
      setMessage("");
      setFile(null);
      setPasscode("");
    }, 2000);

    if (!file) {
      setMessage("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("passcode", passcode);

    let response = await uploadFIle(formData);
    setMessage(response);
    triggerChildFunction();
  };

  return (
    <div className="file-upload-container">
      {message !== "" && (
        <div className="alert alert-primary" role="alert">
          {message}
        </div>
      )}
      <h2>Upload a File</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-content">
          <div>
            <label htmlFor="file">Choose a file :</label>
            <input type="file" id="file" onChange={handleFileChange} />
          </div>
          <div>
            <label htmlFor="passcode">Enter passcode :</label>
            <input
              id="passcode"
              placeholder="Set file password"
              type="password"
              value={passcode}
              onChange={handlePasscodeChange}
            />
          </div>
          <button type="submit btn-grad">Upload</button>
        </div>
      </form>
      <FileList ref={childRef} />
    </div>
  );
};

export default FileUpload;
