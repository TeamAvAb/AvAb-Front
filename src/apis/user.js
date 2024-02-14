import axios from "axios";

export const publicAPI = axios.create({ baseURL: "https://dev.avab.shop" });
export const privateAPI = axios.create({
  baseURL: "https://dev.avab.shop",
});
const tokenExceptions = new Set(["/api/auth/login/kakao"]);
const REFRESH_URL = "/api/auth/refresh";
privateAPI.interceptors.request.use(
  (config) => {
    if (!config.headers) return config;
    const token = localStorage.getItem("accessToken");
    if (config.url === REFRESH_URL) {
      token = localStorage.getItem("refreshToken");
    } else {
      token = localStorage.getItem("accessToken");
    }

    if (token && !tokenExceptions.has(config.url)) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    console.log("에러 : ", error);
  }
);

privateAPI.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    if (error.status === 401) {
      console.log("권한이 없습니다!");
    }
  }
);
