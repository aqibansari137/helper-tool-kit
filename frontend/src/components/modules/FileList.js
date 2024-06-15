import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import { deleteUploadedFile, fetchUploadedFile } from "../../services/api";

const FileList = forwardRef((props, ref) => {
  const [files, setFiles] = useState([]);
  const [passcode, setPasscode] = useState("");

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    let response = await fetchUploadedFile();
    if (response) {
      setFiles(response);
      let arr = Array(response.length).fill("");
      setPasscode(arr);
    }
  };

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
}

  return (
    <div>
      <h2>Uploaded Files</h2>
      <div className="file-list-container">
        <button className="clear" onClick={handleDeleteAllFiles}>
          Clear
        </button>
        {files.length !== 0 ? (
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
              {files.map((file, i) => (
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
                    <a
                      className={`btn-grad ${
                        passcode[i] === "" ? "btn-disable" : ""
                      }`}
                      href={`http://localhost:2716/downloads/${file._id}?passcode=${passcode[i]}`}
                      download
                    >
                      Download
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <h3 className="text-center">No Files available !!</h3>
        )}
      </div>
    </div>
  );
});

export default FileList;
