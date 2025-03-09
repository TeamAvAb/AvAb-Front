import { Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Main from './pages/Main';
import MyPage from './pages/MyPage';
import MyFavoriteRecreations from './pages/MyFavoriteRecreations';
import RecreationSearchList from './pages/RecreationSearchList';
import FlowWrite from './pages/FlowWrite'; // 플로우 만들기 페이지
import FlowWriteDetail from './pages/FlowWriteDetail'; // 플로우 만들기 상세 페이지
import FlowWriteRecommend from './pages/FlowWriteRecommend'; // 플로우 만들기 추천 페이지
import FlowWriteContent from './pages/FlowWriteContent'; // 플로우 만들기 내용 페이지
import RecreationDetail from './pages/RecreationDetail'; // 레크레이션 상세정보 페이지
import MyFlow from './pages/MyFlow'; // 내 일정 플로우 페이지
import WatchFlow from './pages/WatchFlow'; // 플로우 구경하기
import ScrapFlow from './pages/ScrapFlow'; // 스크랩 한 플로우 보기
import MoreMyflow from './pages/MoreMyflow'; // 내가 만든 일정플로우 더보기
import FlowDetails from './pages/FlowDetails'; // 다른 사람이 만든 일정플로우 더보기
import MoreScrapFlow from './pages/MoreScrapFlow'; // 스크랩 한 일정플로우 더보기
import LoginLoading from './pages/LoginLoading'; // 로그인 시 로딩 페이지
import GlobalStyle from './GlobalStyles'; // 전역 스타일
import useLoginModalStore from './stores/loginModalStore';
import cryingAvb from './assets/main/cryingAvb.png';
import styled, { ThemeProvider } from 'styled-components';
import theme from './styles/theme';
import NotFound from './pages/NotFound';
import LoginModal from './components/modal/LoginModal';
import Header from './components/common/Header';
import Footer1 from './components/common/footer/Footer1';
import Footer2 from './components/common/footer/Footer2';
import Footer3 from './components/common/footer/Footer3';
import CreateFlow from './pages/CreateFlow';

function App() {
  const navigate = useNavigate();
  const [selectedFooter, setSelectedFooter] = useState(<Footer1 />);
  const [isMobile, setIsMobile] = useState(false); // 모바일인지 여부

  const { modalOpen } = useLoginModalStore();
  const routes = (
    <Routes>
      {/* 메인 */}
      <Route path="/" element={<Main />} />
      {/* 마이 페이지 내 정보 */}
      <Route path="/mypage/myinfo" element={<MyPage />} />
      {/* 마이 페이지 즐겨찾는 레크레이션 */}
      <Route path="/mypage/favorites" element={<MyFavoriteRecreations />} />
      {/* 검색 리스트 페이지 */}
      <Route path="/search/list" element={<RecreationSearchList />} />
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
      <Route path="/flow/morewatchflow/:title" element={<FlowDetails />} />
      {/* 내가 만든 일정플로우 더보기 */}
      <Route path="/flow/moremyflow/:title" element={<MoreMyflow />} />
      {/* 스크랩 한 일정플로우 더보기 */}
      <Route path="/flow/morescrapflow/:title" element={<MoreScrapFlow />} />
      {/* 레크레이션 상세정보 페이지 */}
      <Route path="/recreation/detail/:recreationId" element={<RecreationDetail />} />
      {/* 로그인 리다이렉트 페이지 */}
      <Route path="/api/auth/login/kakao" element={<LoginLoading />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/flow/create" element={<CreateFlow />} />
    </Routes>
  );

  // 화면 크기 감지
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsMobile(true); // 모바일 화면이면 true
      } else {
        setIsMobile(false); // 모바일 화면이 아니면 false
      }
    };

    handleResize(); // 초기 화면 크기 확인
    window.addEventListener('resize', handleResize); // 화면 크기 변경 감지

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobile]);

  useEffect(() => {
    const currentPath = window.location.pathname;
    if (
      currentPath.startsWith('/flow/morewatchflow') ||
      currentPath.startsWith('/recreation/detail')
    ) {
      setSelectedFooter(<Footer2 />);
    } else if (currentPath === '/' || currentPath === '/search/list') {
      setSelectedFooter(<Footer1 />);
    } else {
      setSelectedFooter(<Footer3 />);
    }
  }, [navigate]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Header />
      {modalOpen ? <LoginModal /> : null}

      {/* 모바일 화면일 경우 메시지 표시 */}
      {isMobile ? (
        <MobileOverlay>
          <MobileMessage>모바일 버전은 준비 중입니다.</MobileMessage>
          <SubMessage>PC로 접속해주세요.</SubMessage>
          <Image src={cryingAvb} alt="Crying Avatar" />
        </MobileOverlay>
      ) : (
        <>
          <main className="main">{routes}</main>
          {selectedFooter}
        </>
      )}
    </ThemeProvider>
  );
}

const MobileOverlay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  z-index: 1000;
`;

const MobileMessage = styled.p`
  font-size: 30px;
  font-weight: 700;
  color: black;
  margin-bottom: 8px;
`;

const SubMessage = styled.div`
  font-size: 18px;
  color: black;
  margin-bottom: 35px;
`;

const Image = styled.img`
  width: 150px;
  height: 150px;
`;
export default App;
