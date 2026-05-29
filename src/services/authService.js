import axios from "axios";

const API = `${process.env.REACT_APP_API_URL}/anything/auth`;

export const registerUser = (data) => {
    return axios.post(`${API}/register`, data);
};

export const loginUser = (data) => {
    return axios.post(`${API}/login`, data);
};
