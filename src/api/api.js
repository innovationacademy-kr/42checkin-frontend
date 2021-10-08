import axios from 'axios';
const apiUrl = process.env.REACT_APP_API_URL;

const instance = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
  headers: {
    'X-42Cadet-Auth-Key': process.env.REACT_APP_X_42CADET_AUTH
  }
});

export const checkAdmin = async () => {
  return await instance.get(`/user/status`);
};

export const validCard = async cardNum => {
  return await instance.get(`/card/valid/${cardNum}`);
};

export const checkIn = async cardNum => {
  return await instance.post(`/user/checkIn/${cardNum}`);
};

export const checkOut = async cardNum => {
  return await instance.post(`/user/checkOut`);
};

export const getMaxCapacity = async date => {
  return await instance.get(`/config`, { params: { date } });
};

export const getUsingCard = async () => {
  return await instance.get(`/user/using`);
};

export const getUsageList = async (from, to) => {
  return await instance.get(`/user/usage`, { params: { from, to } });
};

export const getDailyUsage = async (from, to) => {
  return await instance.get(`/user/usage/daily`, { params: { from, to } });
};
