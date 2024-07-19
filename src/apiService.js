import axios from 'axios';

const API_BASE_URL = 'https://valorant-api.com/v1';

export const getAgents = () => axios.get(`${API_BASE_URL}/agents`);
export const getMaps = () => axios.get(`${API_BASE_URL}/maps`);
// Add more API endpoints as needed
