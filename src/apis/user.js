import axios from "axios";
// 인증이 필요없는 요청
export const publicAPI = axios.create({ baseURL: "https://dev.avab.shop" });

//인증이 필요한 요청
export const privateAPI = axios.create({
  baseURL: "https://dev.avab.shop",
});

// 리프레시 토큰 요청 함수
export async function postRefreshToken() {
  try {
    const response = await publicAPI.post("/api/auth/refresh");
    if (response.status === 401) {
      console.log("aaaa");
      return response;
    }
  } catch (error) {
    console.log("dfdddd : ", error);
  }
}

// 로그인 여부 반환 함수
export function isLoggedIn() {
  return !!localStorage.getItem("accessToken");
}

// 인증이 필요한 요청 인터셉터
privateAPI.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem(
      "accessToken"
    )}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 인증이 필요한 응답 인터셉터
privateAPI.interceptors.response.use(
  (res) => {
    return res;
  },
  async (error) => {
    const {
      config,
      response: { status },
    } = error;

    if (status === 401) {
      const originRequest = config;
      if (localStorage.getItem("refreshToken")) {
        //리프레시 토큰 api
        const response = await postRefreshToken();
        //리프레시 토큰 요청이 성공할 때
        if (response.status === 200) {
          const newAccessToken = response.data.result.accessToken;
          localStorage.setItem("accessToken", response.data.result.accessToken);
          localStorage.setItem(
            "refreshToken",
            response.data.result.refreshToken
          );
          axios.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
          //진행중이던 요청 이어서하기
          originRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axios(originRequest);
          //리프레시 토큰 요청이 실패할때(리프레시 토큰도 만료되었을때 = 재로그인 안내)
        } else if (response.status === 401) {
          alert("세션이 만료되었습니다. 재로그인 해주세요.");
        } else {
          console.log("인터셉터 내부 기타 에러 : ", error);
        }
      } else {
        // 리프레시 토큰이 없는 경우 = 로그인 안내
        alert("로그인이 필요한 서비스입니다.");
        return "need login";
      }
    }
    return Promise.reject(error);
  }
);
