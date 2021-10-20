import axios, { AxiosResponse } from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

const instance = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
  headers: {
    "X-42Cadet-Auth-Key": process.env.REACT_APP_X_42CADET_AUTH,
  },
});

interface GetUserStatus {
  (): Promise<
    AxiosResponse<{
      user: {
        login: string;
        card: null | string;
        profile_image_url: string | null;
      };
      cluster: {
        gaepo: number;
        seocho: number;
      };
      isAdmin: boolean;
    }>
  >;
}

export const getUserStatus: GetUserStatus = () => {
  return instance.get(`/user/status`);
};

// export const validCard = (cardNum: string | number) => {
//   return instance.get(`/card/valid/${cardNum}`);
// };

interface PostCheckIn {
  (cardNum: string): Promise<AxiosResponse<{ result: boolean; notice: boolean }>>;
}

export const postCheckIn: PostCheckIn = (cardNum: string | number) => {
  return instance.post(`/user/checkIn/${cardNum}`);
};

interface PostCheckOut {
  (): Promise<AxiosResponse<boolean>>;
}

export const postCheckOut: PostCheckOut = () => {
  return instance.post(`/user/checkOut`);
};

interface GetConfig {
  (date: string): Promise<
    AxiosResponse<{
      begin_at: string | null;
      checkin_at: string | null;
      checkout_at: string | null;
      close_at: string | null;
      created_at: string | null;
      deleted_at: string | null;
      end_at: string | null;
      env: "production" | "development";
      gaepo: number;
      open_at: string;
      seocho: number;
      updated_at: string | null;
      _id: 1;
    }>
  >;
}
export const getConfig: GetConfig = (date) => {
  return instance.get(`/config`, { params: { date } });
};
interface GetUsingCard {
  (): Promise<AxiosResponse<{ gaepo: number; seocho: number }>>;
}

export const getUsingCard: GetUsingCard = () => {
  return instance.get(`/user/using`);
};

export const getUsageList = async (from: string, to: string) => {
  return instance.get(`/user/usage`, { params: { from, to } });
};

interface GetDailyUsage {
  (from: string, to: string): Promise<AxiosResponse<{ list: Usage[] }>>;
}

export const getDailyUsage: GetDailyUsage = async (from: string, to: string) => {
  return instance.get(`/user/usage/daily`, { params: { from, to } });
};
