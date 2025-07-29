import axios from 'axios';

const axiosInstance = axios.create();

type VoidFunction = () => void;
let onRequestCallback: VoidFunction | null = null;

axiosInstance.interceptors.response.use((res) => {
    if (onRequestCallback) {
        onRequestCallback();
    }
    return res;
});

export default axiosInstance;
