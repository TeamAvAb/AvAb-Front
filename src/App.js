import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./pages/Main";
import MyPage from "./pages/Mypage";
import Search from "./pages/Search";
import SearchList from "./pages/SearchList";
import FlowWrite from "./pages/FlowWrite"; // 플로우 만들기 페이지
import RecreationDetail from "./pages/recreation/RecreationDetail"; // 레크레이션 상세정보 페이지
import FlowWriteDetail from "./pages/FlowWriteDetail"; // 플로우 만들기 상세 페이지
import FlowWriteRecommend from "./pages/FlowWriteRecommend"; // 플로우 만들기 추천 페이지
import FlowWriteContent from "./pages/FlowWriteContent"; // 플로우 만들기 내용 페이지
import RecreationDetail from "./pages/RecreationDetail"; // 레크레이션 상세정보 페이지
import FlowMy from "./pages/FlowMy"; // 내 일정 플로우 페이지

function App() {
  return (
    <div className="App">

       <Header />
        <Routes>
          <Route path="/" element={<Main />} /> {/* 메인 */}
          <Route path="/search" element={<Search />} /> {/* 검색 페이지 */}

          <Route path="/mypage" element={<MyPage />} /> {/* 마이 페이지 */}

          <Route path="/search/list" element={<SearchList />} /> {/* 검색 리스트 페이지 */}
          <Route path="/flow/write" element={<FlowWrite />} /> {/* 플로우 만들기 기본 페이지 */}
          <Route path="/flow/write/detail" element={<FlowWriteDetail />} /> {/* 플로우 만들기 상세 페이지 */}
          <Route path="/flow/write/recommend" element={<FlowWriteRecommend />} /> {/* 플로우 만들기 상세 페이지 */}
          <Route path="/flow/write/content" element={<FlowWriteContent/>} /> {/* 플로우 만들기 상세 페이지 */}

          <Route path="/flow/my" element={<FlowMy />} /> {/* 내 일정 플로우 페이지 */}

          <Route path="/recreation/detail" element={<RecreationDetail />} /> {/* 레크레이션 상세정보 페이지 */}

        </Routes>
        <Footer />
    </div>
  );
}

export default App;
