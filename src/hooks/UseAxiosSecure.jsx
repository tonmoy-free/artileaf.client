import axios from 'axios';
import React, { useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';

const axiosInstance = axios.create({
    baseURL: 'https://artileaf-server.vercel.app/',
})

const UseAxiosSecure = () => {
    const { user } = useContext(AuthContext);

    axiosInstance.interceptors.request.use(config => {
        config.headers.authorization = `Bearer ${user.accessToken}`
        return config;
    })
    return axiosInstance;
};

export default UseAxiosSecure;