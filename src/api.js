import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

export const getCards = async () => {
  const response = await axios.get(`${API_BASE_URL}/cards`);
  return response.data;
};

export const addCard = async (card) => {
  const response = await axios.post(`${API_BASE_URL}/cards`, card);
  return response.data;
};

export const deleteCard = async (id) => {
  await axios.delete(`${API_BASE_URL}/cards/${id}`);
};

export const addAchievement = async (achievement) => {
  const response = await axios.post(`${API_BASE_URL}/achievements`, achievement);
  return response.data;
};

export const addCompletedTask = async (task) => {
  const response = await axios.post(`${API_BASE_URL}/completed-tasks`, task);
  return response.data;
};

