import axios from 'axios';
const spacexApi = axios.create({
    baseURL: 'https://api.spacexdata.com/v3',
});

export const fetchCapsules = (queryParams) => spacexApi.get('/capsules/past', { params: queryParams });