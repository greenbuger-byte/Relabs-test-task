import axios from "axios";

const http = axios.create({
    baseURL: 'https://test.relabs.ru/api/',
    headers: {
        'Content-Type': 'application/json',
    }
})
const request = {
    users: (page, limit) => http
        .get(`users/list?offset=${page*limit-limit}&limit=${limit}`)
        .then( response => response.data)
        .catch(error => ({ status: 'error', message: error.message}))
}

export default request;