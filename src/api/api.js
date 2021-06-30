import axios from 'axios';
const apiUrl = process.env.REACT_APP_API_URL;

const instance = axios.create({
  baseURL: apiUrl,
  withCredentials: true
});

export const checkAdmin = async () => {
  return await instance.get(`/user/status`);
};

export const forceCheckOut = async userId => {
  return await instance.post(`/user/forceCheckOut/${userId}`);
};

export const getCluster = async (ClusterType, page) => {
  return await instance.get(`/log/${ClusterType === 0 ? 'gaepo' : 'seocho'}?page=${page}`);
};

export const getStudent = async (login, page) => {
  return await instance.get(`/log/user/${login}?page=${page}`);
};

export const getCard = async (cardId, page) => {
  return await instance.get(`/log/card/${cardId}?page=${page}`);
};

export const getCheckIn = async ClusterType => {
  return await instance.get(`/log/checkIn/${ClusterType}`);
};

export const getAllCarad = async ClusterType => {
  return await instance.get(`/log/allCard/${ClusterType}`);
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
