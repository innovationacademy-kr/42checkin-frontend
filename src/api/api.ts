import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

const instance = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
  headers: {
    "X-42Cadet-Auth-Key": process.env.REACT_APP_X_42CADET_AUTH,
  },
});

export const checkAdmin = () => {
  return instance.get(`/user/status`);
};

export const validCard = (cardNum: string | number) => {
  return instance.get(`/card/valid/${cardNum}`);
};

export const checkIn = (cardNum: string | number) => {
  return instance.post(`/user/checkIn/${cardNum}`);
};

export const checkOut = () => {
  return instance.post(`/user/checkOut`);
};

export const getMaxCapacity = (date: string) => {
  return instance.get(`/config`, { params: { date } });
};

export const getUsingCard = () => {
  return instance.get(`/user/using`);
};

export const getUsageList = async (from: string, to: string) => {
  return instance.get(`/user/usage`, { params: { from, to } });
};

export const getDailyUsage = async (from: string, to: string) => {
  return instance.get(`/user/usage/daily`, { params: { from, to } });
};
