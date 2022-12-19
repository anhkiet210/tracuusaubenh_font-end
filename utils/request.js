import axios, { AxiosRequestConfig } from 'axios';
import { getToken } from './jwt';
if (typeof window !== 'undefined') {
    var token = localStorage.getItem('accessToken');
}
// const tokenLocal = JSON.stringify(token);

const request = axios.create({
    baseURL: 'https://ak-tracuusaubenh.vercel.app',
    // baseURL: 'http://localhost:5000',
});

request.interceptors.request.use(
    function (config = AxiosRequestConfig) {
        if (getToken() || token) {
            config.headers.Authorization = `Bearer ${getToken() || token}`;
        } else {
            delete config.headers.Authorization;
        }
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    },
);

export const get = async (path, option = {}) => {
    const responese = await request.get(path, option);
    return responese.data;
};

export const post = async (path, option = {}) => {
    const responese = await request.post(path, option);
    return responese.data;
};

export const put = async (path, option = {}) => {
    const responese = await request.put(path, option);
    return responese.data;
};

export const deleteMethod = async (path, option = {}) => {
    const responese = await request.delete(path, option);
    return responese.data;
};

export default request;
