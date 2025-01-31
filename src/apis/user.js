import axios from 'axios';
import useLoginStore from '../stores/loginStore';

// 인증이 필요없는 요청
export const publicAPI = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

//인증이 필요한 요청
export const privateAPI = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// 리프레시 토큰 요청 함수
export async function postRefreshToken() {
  try {
    const loginStorage = JSON.parse(localStorage.getItem('loginStorage'));
    const refreshToken = loginStorage.state.refreshToken;
    console.log('현재 저장된 리프레시 토큰', refreshToken);
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}api/auth/refresh`,
      {},
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      },
    );
    console.log('요청 결과는?? : ', response);
    if (response.status === 200) {
      // 토큰 재발급 성공
      const { setAccessToken, setRefreshToken } = useLoginStore.getState();
      const newAccessToken = response.data.result.accessToken;
      const newRefreshToken = response.data.result.refreshToken;
      setAccessToken(newAccessToken);
      setRefreshToken(newRefreshToken);
      console.log('토큰 재발급 성공');
      return response;
    }
  } catch (error) {
    if (error.response.status === 401) {
      console.log('토큰 만료?', error.response);
      localStorage.clear(); // 리프레시 토큰 만료 = 로컬스토리지 토큰 삭제
    }
  }
}

// 인증이 필요한 요청 인터셉터
privateAPI.interceptors.request.use(
  (config) => {
    const loginStorage = JSON.parse(localStorage.getItem('loginStorage'));
    config.headers.Authorization = `Bearer ${loginStorage.state.accessToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 인증이 필요한 응답 인터셉터
privateAPI.interceptors.response.use(
  (res) => {
    return res;
  },
  async (error) => {
    if (error.response) {
      const {
        config,
        response: { status },
      } = error;

      const loginStorage = JSON.parse(localStorage.getItem('loginStorage'));
      if (status === 401) {
        const originRequest = config;
        if (loginStorage.state.refreshToken) {
          //리프레시 토큰 api
          const response = await postRefreshToken();
          console.log('리프레시 토큰 요청 응답 : ', response);
          //리프레시 토큰 요청이 성공할 때
          if (response.status === 200) {
            const loginStorage = JSON.parse(localStorage.getItem('loginStorage'));
            const newAccessToken = loginStorage.state.accessToken;
            console.log('요청 이어서 보내기');
            axios.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
            //진행중이던 요청 이어서하기
            originRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            console.log('원래 요청 : ', originRequest);
            return axios(originRequest);
            //리프레시 토큰 요청이 실패할때(리프레시 토큰도 만료되었을때 = 재로그인 안내)
          } else if (response.data.status === 401) {
            loginStorage.clear();
            alert('세션이 만료되었습니다. 재로그인 해주세요.');
          } else {
            console.log('인터셉터 내부 기타 에러 : ', error);
            alert('에러가 발생했습니다. 관리자에게 문의해주세요!');
          }
        } else {
          // 리프레시 토큰이 없는 경우 = 로그인 안내
          console.log(error);
          alert('로그인이 필요한 서비스입니다.');
          return 'need login';
        }
      }
    }
    return Promise.reject(error);
  },
);
