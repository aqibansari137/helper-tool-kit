import axios from 'axios';
const API_URL = "https://helper-tool-kit.onrender.com";
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