import axios from 'axios';

const CLUSTER = {
  0: 'gaepo',
  1: 'seocho'
};

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
  return await instance.get(`/log/${CLUSTER[ClusterType]}?page=${page}`);
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

export const getAllCard = async ClusterType => {
  return await instance.get(`/log/allCard/${ClusterType}`);
};
