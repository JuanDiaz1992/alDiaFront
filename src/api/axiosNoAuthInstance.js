import axios from 'axios';

const noAuthInstance = axios.create({
    baseURL: process.env.REACT_APP_URL_HOST,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default noAuthInstance;