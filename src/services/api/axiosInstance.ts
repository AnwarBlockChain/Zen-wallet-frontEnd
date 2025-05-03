import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://13.234.231.87:3001', // Set your base URL
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add Authorization token dynamically (if needed)
// axiosInstance.interceptors.request.use((config) => {
//     const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
// });

export default axiosInstance;
