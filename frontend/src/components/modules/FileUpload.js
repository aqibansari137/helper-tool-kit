import React, { useState, useRef } from "react";
import FileList from "./FileList";
import { uploadFIle } from "../../services/api";
import "../styles/FileUpload.scss";
import { storage } from "../../firebase";

const FileUpload = ({ setLoaderShow, showAlertMsg }) => {
  const [file, setFile] = useState(null);
  const [passcode, setPasscode] = useState("");
  const uploadRef = useRef(null);
  const childRef = useRef();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

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
    setLoaderShow(true);

    if (!file) {
      showAlertMsg("Please select a file", "alert-primary");
    } else {
      const storageRef = storage.ref();
      const fileRef = storageRef.child(file.name);

      fileRef.put(file).then(() => {
        fileRef.getDownloadURL().then(async (downloadUrl) => {
          const fileData = {
            name: file.name,
            size: file.size,
            downloadUrl: downloadUrl,
            passcode: passcode,
          };

          let response = await uploadFIle(fileData);
          showAlertMsg(response, "alert-success");
          if (uploadRef.current) {
            uploadRef.current.value = "";
          }
          setPasscode("");
          setLoaderShow(false);
          triggerChildFunction();
        });
      });
    }
  };

  return (
    <div className="file-upload-container">
      <h1 className="text-center">File Sharing</h1>
      <h2>Upload a File</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-content">
          <div>
            <label htmlFor="file">Choose a file :</label>
            <input
              type="file"
              ref={uploadRef}
              id="file"
              onChange={handleFileChange}
            />
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
          <button type="submit" className="btn-grad">Upload</button>
        </div>
      </form>
      <FileList
        ref={childRef}
        showAlertMsg={showAlertMsg}
        setLoaderShow={setLoaderShow}
      />
    </div>
  );
};

export default FileUpload;
