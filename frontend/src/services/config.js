import axios from 'axios';
import { getProjectToken, removeProjectToken } from './token';

export const request = axios.create({
    baseURL: 'http://localhost:8000',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const setupAxiosInterceptors = () => {
    request.interceptors.request.use(
        (config) => {
            const token = getProjectToken();
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    request.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            if (error.response.status === 401) {
                removeProjectToken();
                window.location.reload();
            }
            return Promise.reject(error);
        }
    );
}
