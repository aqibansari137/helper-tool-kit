import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
  useCallback 
} from "react";
import { deleteUploadedFile, fetchUploadedFile } from "../../services/api";
import axios from "axios";

const FileList = forwardRef((props, ref) => {
  const [files, setFiles] = useState([]);
  const [passcode, setPasscode] = useState("");
  const [searchTxt, setSearchTxt] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const fetchFiles = useCallback(async () => {
    props.setLoaderShow(true);
    let response = await fetchUploadedFile();
    if (response) {
      response.sort((a, b) => new Date(b.date) - new Date(a.date));
      setFiles(response);
      setFilteredData(response);
      settingPasscodeArr(response.length);
      props.setLoaderShow(false);
    }
  }, []);

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
  }

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
      props.showAlertMsg(err.response.data.msg,"alert-danger");
    }
  };

  return (
    <div>
      <h2>Uploaded Files</h2>
      <div className="file-list-container">
        <button className="clear" onClick={handleDeleteAllFiles}>
          Clear
        </button>
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
                  <th>Filename</th>
                  <th>Size</th>
                  <th>Date</th>
                  <th>Action</th>
                  <th>Download</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((file, i) => (
                  <tr key={file._id}>
                    <td>{file.originalName}</td>
                    <td>{formatBytes(file.size)}</td>
                    <td>{new Date(file.date).toLocaleString()}</td>
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
