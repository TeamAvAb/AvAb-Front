import useLoginModalStore from '../stores/loginModalStore';
import { useEffect, useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import theme from '../styles/theme';
import GlobalStyle from '../GlobalStyles';
import cryingAvb from '../assets/main/cryingAvb.png';
import Header from './common/Header';
import { Outlet } from 'react-router-dom';
import Footer from './common/footer/Footer';
import LoginModal from './common/LoginModal';

export default function AppLayout() {
  const { modalOpen } = useLoginModalStore();

  const [isMobile, setIsMobile] = useState(false);

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
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {isMobile ? (
        <MobileOverlay>
          <MobileMessage>모바일 버전은 준비 중입니다.</MobileMessage>
          <SubMessage>PC로 접속해주세요.</SubMessage>
          <Image src={cryingAvb} alt="" />
        </MobileOverlay>
      ) : (
        <>
          <Header />
          <main className="main">
            <Outlet />
          </main>
          <Footer />
          {modalOpen ? <LoginModal /> : null}
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
