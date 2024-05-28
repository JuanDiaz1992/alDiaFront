import axios from 'axios';
import getCookie from "../Scripts/getCookies";
const instance = axios.create({
    baseURL: process.env.REACT_APP_URL_HOST,
    mode: "cors",
    headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getCookie("token")}`,
    }
});

export default instance;
