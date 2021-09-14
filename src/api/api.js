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

export const getMaxCapacity = async () => {
  return await instance.get(`/config`);
};

export const getUsingCard = async () => {
  return await instance.get(`/card/using`);
};
