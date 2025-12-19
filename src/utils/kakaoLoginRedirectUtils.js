const REST_API_KEY = import.meta.env.VITE_REST_API_KEY;
let REDIRECT_URI;

if (window.location.href.startsWith('http://localhost:3000/')) {
  REDIRECT_URI = import.meta.env.VITE_REDIRECT_URL_LOCAL;
} else {
  REDIRECT_URI = import.meta.env.VITE_REDIRECT_URL;
}

const toKakaoLogin = (pathname) => {
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code&state=${pathname}&prompt=select_account`;

  window.location.href = kakaoURL;
};

export default toKakaoLogin;
