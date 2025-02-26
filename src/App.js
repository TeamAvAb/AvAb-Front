import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import Main from './pages/Main';
import MyPage from './pages/MyPage';
import MyFavoriteRecreations from './pages/MyFavoriteRecreations';
import RecreationSearchList from './pages/RecreationSearchList';
import RecreationDetail from './pages/RecreationDetail'; // 레크레이션 상세정보 페이지
import MyFlow from './pages/MyFlow'; // 내 일정 플로우 페이지
import WatchFlow from './pages/WatchFlow'; // 플로우 구경하기
import ScrapFlow from './pages/ScrapFlow'; // 스크랩 한 플로우 보기
import FlowDetails from './pages/FlowDetails'; // 다른 사람이 만든 일정플로우 더보기
import LoginLoading from './pages/LoginLoading'; // 로그인 시 로딩 페이지
import NotFound from './pages/NotFound';
import CreateFlow from './pages/CreateFlow';
import SITE_URL from './constants/url';
import AppLayout from './components/AppLayout';
import LoginGuard from './components/LoginGuard';

function App() {
  const routes = (
    <>
      <Route index element={<Main />} />
      <Route path={SITE_URL.RECREATION_SEARCH_LIST} element={<RecreationSearchList />} />
      <Route path={SITE_URL.FLOW} element={<WatchFlow />} />
      <Route path={SITE_URL.FLOW_DETAIL(':flowId')} element={<FlowDetails />} />
      <Route path={SITE_URL.RECREATION_DETAIL(':recreationId')} element={<RecreationDetail />} />
      <Route element={<LoginGuard />}>
        <Route path={SITE_URL.MY_FAVORITE_RECREATIONS} element={<MyFavoriteRecreations />} />
        <Route path={SITE_URL.MY_INFO} element={<MyPage />} />
        <Route path={SITE_URL.MY_FLOW} element={<MyFlow />} />
        <Route path={SITE_URL.MY_SCRAP_FLOW} element={<ScrapFlow />} />
        <Route path={SITE_URL.CREATE_FLOW} element={<CreateFlow />} />
      </Route>
      <Route path={SITE_URL.KAKAO_LOGIN} element={<LoginLoading />} />
      <Route path={SITE_URL.NOT_FOUND} element={<NotFound />} />
    </>
  );

  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      children: createRoutesFromElements(routes),
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
