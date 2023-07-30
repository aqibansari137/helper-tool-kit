import axios from 'axios';
// const API_URL = "https://helper-tool-kit.onrender.com";
const API_URL = "http://localhost:2716";
export const uploadingFile = async (file) => {
    try {
        let response = await axios.post(`${API_URL}/upload`, file);
        return response.data;
    }
    catch (err) {
        console.log("Error while calling api", err.message)
    }
}
export const deletingFile = async (id) => {
    try {
        let response = await axios.get(`${API_URL}/delF/${id}`);
        return response.data;
    }
    catch (err) {
        console.log("Error while calling api", err.message)
    }
}
export const getCodeData = async () => {
    try {
        let response = await axios.get(`${API_URL}/getcodedata`);
        return JSON.stringify(response.data);
    } catch (error) {
        console.log("Error while calling api", error.message)
    }
}
export const addCodeData = async (data) => {
    try {
        let response = await axios.post(`${API_URL}/addcodedata`, data);
        return JSON.stringify(response.data);
    } catch (error) {
        console.log("Error while calling api", error.message)
    }
}
export const deleteCodeData = async (id) => {
    try {
        let response = await axios.delete(`${API_URL}/deletecodedata/${id}`);
        return JSON.stringify(response.data);
    } catch (error) {
        console.log("Error while calling api", error.message)
    }
}
export const updateCodeData = async (id, data) => {
    try {
        let response = await axios.put(`${API_URL}/updatecodedata/${id}`, data);
        return JSON.stringify(response.data);
    } catch (error) {
        console.log("Error while calling api", error.message)
    }
}