import axios from 'axios';

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/',
    timeout: 1000,
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            console.error('Error de respuesta:', error.response.data);
            return Promise.reject(error.response.data);
        } else if (error.request) {
            console.error('Error de red:', error.request);
            return Promise.reject('No se recibió respuesta del servidor');
        } else {
            console.error('Error en la petición:', error.message);
            return Promise.reject(error.message);
        }
    }
);

export default api;