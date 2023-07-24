import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = process.env.REACT_APP_API_URL;
const JWT_SECRET = process.env.REACT_APP_JWT_SECRET;
let DELAY = 20;

const API = axios.create({
    baseURL: API_URL,
});

API.interceptors.request.use(
    async (config) => {
        //get param delay from url
        DELAY = parseInt(new URLSearchParams(window.location.search).get('delay') ?? DELAY.toString()) ;

        //add artifical delay, sorry
        await new Promise((resolve) => setTimeout(resolve, DELAY));

        const sessionId = Cookies.get('sessionid');
        const userId = Cookies.get('userid');

        config.headers.Authorization = `Bearer ${JWT_SECRET}`;
        config.headers.sessionId = sessionId;
        config.headers.userId = userId;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default API;