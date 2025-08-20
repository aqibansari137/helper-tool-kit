import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
  useCallback,
} from "react";
import { deleteUploadedFile, fetchUploadedFile, fetchUploadedFileById } from "../../services/api";
import axios from "axios";
import { storage } from "../../firebase";

const FileList = forwardRef(({ setLoaderShow, showAlertMsg }, ref) => {
  const [files, setFiles] = useState([]);
  const [passcode, setPasscode] = useState("");
  const [searchTxt, setSearchTxt] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [delPass, setDelPass] = useState("");
  const [showDelPopup, setShowDelPopup] = useState(false);

  const fetchFiles = useCallback(async () => {
    setLoaderShow(true);
    let response = await fetchUploadedFile();
    if (response) {
      response.sort((a, b) => new Date(b.date) - new Date(a.date));
      setFiles(response);
      setFilteredData(response);
      settingPasscodeArr(response.length);
      setLoaderShow(false);
    }
  }, [setLoaderShow]);

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  useImperativeHandle(ref, () => ({
    fetchFiles,
  }));

  const handleDeleteAllFiles = async () => {
    await deleteUploadedFile();
    setFiles([]); // Clear files state or update as needed
  };

  const handleInputChange = (index, value) => {
    setPasscode((prev) => {
      const newArr = [...prev]; // Create a new array
      newArr[index] = value; // Update the value at the specific index
      return newArr;
    });
  };

  const formatBytes = (bytes) => {
    if (bytes < 1024) {
      return bytes + " bytes";
    } else if (bytes < 1024 * 1024) {
      return (bytes / 1024).toFixed(2) + " KB";
    } else if (bytes < 1024 * 1024 * 1024) {
      return (bytes / (1024 * 1024)).toFixed(2) + " MB";
    } else {
      return (bytes / (1024 * 1024 * 1024)).toFixed(2) + " GB";
    }
  };

  const settingPasscodeArr = (len) => {
    let arr = Array(len).fill("");
    setPasscode(arr);
  };

  const searchByText = (text) => {
    setSearchTxt(text);
    const searchResult = files.filter((item) =>
      item.originalName.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(searchResult);
    settingPasscodeArr(searchResult.length);
  };

  const downloadFileById = async (id, passcode) => {
    try {
      const resp = await axios.get(
        `${process.env.REACT_APP_API_URL}/downloads/${id}?passcode=${passcode}`
      );
      const link = document.createElement("a");
      link.href = resp.data.url;
      link.target = "_blank";
      link.download = resp.data.name; // You can specify a default filename here if you want
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      settingPasscodeArr(filteredData.length);
    } catch (err) {
      console.log(err);
      showAlertMsg(err.response.data.msg, "alert-danger");
    }
  };

  const formatDateNTime = (date) => {
    const dateData = new Date(date);
    const dateFormat = dateData.toLocaleDateString("en-GB", {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
    });
    const timeFormat = dateData.toLocaleTimeString("en-GB", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    return dateFormat + ", " + timeFormat;
  };

  const toggleFileSelection = (fileId) => {
    setSelectedFiles((prev) =>
      prev.includes(fileId)
        ? prev.filter((id) => id !== fileId)
        : [...prev, fileId]
    );
  };

  const toggleSelectAll = () => {
    if (selectedFiles.length === filteredData.length) {
      setSelectedFiles([]);
    } else {
      setSelectedFiles(filteredData.map((f) => f._id));
    }
  };  
  
  const handleDeleteSelected = async () => {
    if (delPass !== process.env.REACT_APP_ADMIN_PASSCODE) {
      showAlertMsg("Unauthorized! Wrong passcode.", "alert-danger");
      setShowDelPopup(false);
      setDelPass("");
    return;
  }
  
  try {
    setLoaderShow(true);
    setShowDelPopup(false);
    setDelPass("");
    for (let id of selectedFiles) {
      const file = files.find((f) => f._id === id);
      if (file) {
        let response = await fetchUploadedFileById(file._id);
        if(response){ 
          // delete from firebase
          const fileRef = storage.refFromURL(response.url);
          await fileRef.delete();
          
          // delete from database
          await deleteUploadedFile(file._id);
        }
      }
    }

    // UI update
    const updatedFiles = files.filter((f) => !selectedFiles.includes(f._id));
    setFiles(updatedFiles);
    setFilteredData(updatedFiles);
    setSelectedFiles([]);
    showAlertMsg("Selected files deleted successfully", "alert-success");
  } catch (error) {
    console.error("Delete error:", error);
    showAlertMsg("Failed to delete selected files", "alert-danger");
  } finally {
    setLoaderShow(false);
  }
};



  return (
    <div>
      <h2>Uploaded Files</h2>
      <div className="file-list-container">
        <button className="clear" onClick={handleDeleteAllFiles}>
          Clear
        </button>
        {
          showDelPopup && <div
          className="dialogBoxArea row gap-2 confirm-popUp"
          style={{ zIndex: "20", width: "auto" }}
        >
          <h3 className="col-12 text-center">Admin Password Required!!</h3>
          <input name="pass" value={delPass} type="password" onChange={(e)=>setDelPass(e.target.value)}/>
          <button
            className="col btn-grad"
            id="confirmBtn"
            onClick={handleDeleteSelected}
          >
            Confirm
          </button>
          <button
            className="col btn-grad btn-grad-red"
            onClick={()=>setShowDelPopup(false)}
          >
            Cancel
          </button>
        </div>
}
        {selectedFiles.length!==0 && <button onClick={()=>setShowDelPopup(true)} className="btn-grad btn-grad-red delete-btn">
          Delete Selected
        </button>
        }
        {files.length !== 0 ? (
          <>
            <input
              type="text"
              className="searchbox"
              value={searchTxt}
              onChange={(e) => searchByText(e.target.value)}
              placeholder="Type to Search..."
            />
            <table>
              <thead>
                <tr>
                  <th>
                    <input
                      type="checkbox"
                      className="file-checkbox"
                      checked={
                        selectedFiles.length === filteredData.length &&
                        filteredData.length > 0
                      }
                      onChange={toggleSelectAll}
                    />
                  </th>
                  <th>Filename</th>
                  <th>Size</th>
                  <th>Date & Time</th>
                  <th>Action</th>
                  <th>Download</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((file, i) => (
                  <tr key={file._id}>
                    <td>
                     <input
                       type="checkbox"
                       className="file-checkbox"
                       checked={selectedFiles.includes(file._id)}
                       onChange={() => toggleFileSelection(file._id)}
                     />
                   </td>
                    <td>{file.originalName}</td>
                    <td>{formatBytes(file.size)}</td>
                    {/* <td>{new Date(file.date).toLocaleDateString("en-GB",{})}</td> */}
                    <td>{formatDateNTime(file.date)}</td>
                    <td>
                      <input
                        type="password"
                        placeholder="Enter passcode to download"
                        value={passcode[i]}
                        onChange={(e) => handleInputChange(i, e.target.value)}
                      />
                    </td>
                    <td>
                      <button
                        className={`btn-grad ${
                          passcode[i] === "" ? "btn-disable" : ""
                        }`}
                        onClick={() => downloadFileById(file._id, passcode[i])}
                      >
                        Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <h3 className="text-center">No Files available !!</h3>
        )}
      </div>
    </div>
  );
});

export default FileList;
