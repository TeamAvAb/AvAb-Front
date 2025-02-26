const SITE_URL = {
  MAIN: '/',
  RECREATION_SEARCH_LIST: '/search/list',
  MY_INFO: '/mypage/myinfo',
  FLOW: '/flow/watch',
  RECREATION_DETAIL: (recreationId) => `/recreation/detail/${recreationId}`,
  FLOW_DETAIL: (flowId) => `/flow/morewatchflow/${flowId}`,
  MY_FAVORITE_RECREATIONS: '/mypage/favorites',
  MY_FLOW: '/flow/my',
  MY_SCRAP_FLOW: '/flow/scrap',
  CREATE_FLOW: '/flow/create',
  KAKAO_LOGIN: '/api/auth/login/kakao',
  NOT_FOUND: '*',
};

export default SITE_URL;
