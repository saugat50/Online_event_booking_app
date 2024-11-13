import axios from 'axios';

const api = axios.create({
    baseURL: 'https://online-event-booking-app-1.onrender.com',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

export default api;
