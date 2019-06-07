import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://myexactjobsapi.herokuapp.com/api'
});

export default instance;