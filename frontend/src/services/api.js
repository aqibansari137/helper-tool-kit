import axios from "axios";
// const API_URL = "https://helper-tool-kit.onrender.com";
// const API_URL = "http://localhost:2716"; // for locals
const API_URL = process.env.REACT_APP_API_URL;

export const getCodeData = async () => {
  try {
    let response = await axios.get(`${API_URL}/getcodedata`);
    return JSON.stringify(response.data);
  } catch (error) {
    console.log("Error while calling api", error.message);
  }
};
export const addCodeData = async (data) => {
  try {
    let response = await axios.post(`${API_URL}/addcodedata`, data);
    return JSON.stringify(response.data);
  } catch (error) {
    console.log("Error while calling api", error.message);
  }
};
export const deleteCodeData = async (id) => {
  try {
    let response = await axios.delete(`${API_URL}/deletecodedata/${id}`);
    return JSON.stringify(response.data);
  } catch (error) {
    console.log("Error while calling api", error.message);
  }
};
export const updateCodeData = async (id, data) => {
  try {
    let response = await axios.put(`${API_URL}/updatecodedata/${id}`, data);
    return JSON.stringify(response.data);
  } catch (error) {
    console.log("Error while calling api", error.message);
  }
};

export const uploadFIle = async (data) => {
  try {
    await axios.post(`${API_URL}/upload`, data);
    return "File uploaded successfully";
    // Optionally clear the form or update state
  } catch (err) {
    console.error("Error uploading file", err);
    return "Failed to upload file";
  }
};

export const fetchUploadedFile = async () => {
  try {
    const res = await axios.get(`${API_URL}/allFiles`);
    return res.data;
  } catch (err) {
    console.error("Error fetching files", err);
  }
};

export const fetchUploadedFileById = async (fileId) => {
  try {
    const res = await axios.get(`${API_URL}/uploadFile/${fileId}`);
    return res.data;
  } catch (err) {
    console.error("Error fetching files", err);
  }
};

export const deleteUploadedFile = async (fileIds) => {
  try {
    const res = await axios.post(`${API_URL}/deleteFiles`, { ids: fileIds });
    return res.data;
  } catch (err) {
    console.error("Error deleting files", err);
    throw err;
  }
};

