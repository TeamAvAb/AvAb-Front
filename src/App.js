import { useNavigate } from "react-router-dom";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer1 from "./components/Footer/Footer1";
import Footer2 from "./components/Footer/Footer2";
import Footer3 from "./components/Footer/Footer3";
import Main from "./pages/Main";
import MyPage from "./pages/Mypage";
import FavoriteRecreation from "./pages/FavoriteRecreation";
import Search from "./pages/Search";
import SearchList from "./pages/SearchList";
import FlowWrite from "./pages/FlowWrite"; // 플로우 만들기 페이지
import FlowWriteDetail from "./pages/FlowWriteDetail"; // 플로우 만들기 상세 페이지
import FlowWriteRecommend from "./pages/FlowWriteRecommend"; // 플로우 만들기 추천 페이지
import FlowWriteContent from "./pages/FlowWriteContent"; // 플로우 만들기 내용 페이지
import RecreationDetail from "./pages/recreation/RecreationDetail"; // 레크레이션 상세정보 페이지
import MyFlow from "./pages/MyFlow"; // 내 일정 플로우 페이지
import WatchFlow from "./pages/WatchFlow"; // 플로우 구경하기
import ScrapFlow from "./pages/ScrapFlow"; // 스크랩 한 플로우 보기
import MoreMyflow from "./pages/MoreMyflow"; // 내가 만든 일정플로우 더보기
import MoreWatchFlow from "./pages/MoreWatchFlow"; // 다른 사람이 만든 일정플로우 더보기
import MoreScrapFlow from "./pages/MoreScrapFlow"; // 스크랩 한 일정플로우 더보기
import Login from "./components/Login";
import LoginLoading from "./pages/LoginLoading"; // 로그인 시 로딩 페이지
import GlobalStyle from "./GlobalStyles"; // 전역 스타일

function App() {
  const navigate = useNavigate();
  const [selectedFooter, setSelectedFooter] = useState(<Footer1 />);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const routes = (
    <Routes>
      {/* 메인 */}
      <Route path="/" element={<Main />} />
      {/* 검색 페이지 */}
      <Route path="/search" element={<Search />} />
      {/* 마이 페이지 내 정보 */}
      <Route path="/mypage/myinfo" element={<MyPage handleLogin={setIsLoggedIn} />} />
      {/* 마이 페이지 즐겨찾는 레크레이션 */}
      <Route path="/mypage/favorites" element={<FavoriteRecreation handleLogin={setIsLoggedIn} />} />
      {/* 검색 리스트 페이지 */}
      <Route path="/search/list" element={<SearchList />} />
      {/* 플로우 만들기 기본 페이지 */}
      <Route path="/flow/write" element={<FlowWrite />} />
      {/* 플로우 만들기 상세 페이지 */}
      <Route path="/flow/write/detail" element={<FlowWriteDetail />} />
      {/* 플로우 만들기 상세 페이지 */}
      <Route path="/flow/write/recommend" element={<FlowWriteRecommend />} />
      {/* 플로우 만들기 상세 페이지 */}
      <Route path="/flow/write/content" element={<FlowWriteContent />} />
      {/* 플로우 구경하기 */}
      <Route path="/flow/watch" element={<WatchFlow />} />
      {/* 내 일정 플로우 페이지 */}
      <Route path="/flow/my" element={<MyFlow />} />
      {/* 스크랩 한 플로우 보기 */}
      <Route path="/flow/scrap" element={<ScrapFlow />} />
      {/* 다른 사람이 만든 일정플로우 더보기 */}
      <Route path="/flow/morewatchflow/:title" element={<MoreWatchFlow />} />
      {/* 내가 만든 일정플로우 더보기 */}
      <Route path="/flow/moremyflow:title" element={<MoreMyflow />} />
      {/* 스크랩 한 일정플로우 더보기 */}
      <Route path="/flow/morescrapflow:title" element={<MoreScrapFlow />} />
      {/* 레크레이션 상세정보 페이지 */}
      <Route path="/recreation/detail/:recreationId" element={<RecreationDetail />} />
      {/* 로그인 리다이렉트 페이지 */}
      <Route path="/api/auth/login/kakao" element={<LoginLoading handleLogin={setIsLoggedIn} />} />
    </Routes>
  );

  // 로그인 상태 확인
  useEffect(() => {
    if (window.localStorage.getItem("userId") !== null) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [isLoggedIn]);
  useEffect(() => {
    const currentPath = window.location.pathname;
    if (currentPath === "/flow/watch" || currentPath === "/flow/my" || currentPath === "/recreation/detail") {
      setSelectedFooter(<Footer2 />);
    } else if (currentPath === "/" || currentPath.startsWith("/search")) {
      setSelectedFooter(<Footer1 />);
    } else {
      setSelectedFooter(<Footer3 />);
    }
  }, [navigate]);

  return (
    <div className="App">
      <GlobalStyle />
      <Header isLoggedIn={isLoggedIn} handleLoginStatus={setIsLoggedIn} handleLoginModal={setLoginModal} />
      {loginModal ? <Login handleLoginStatus={setIsLoggedIn} handleLoginModal={setLoginModal} /> : null}
      {routes}
      {selectedFooter}
    </div>
  );
}

export default App;
