import useLoginModalStore from '../stores/loginModalStore';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import cryingAvb from '../assets/character/cryingAvb.png';
import Header from './common/Header';
import { Outlet } from 'react-router-dom';
import Footer from './common/footer/Footer';
import LoginModal from './modal/LoginModal';
import { Helmet } from 'react-helmet-async';

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

  return isMobile ? (
    <MobileOverlay>
      <MobileMessage>모바일 버전은 준비 중입니다.</MobileMessage>
      <SubMessage>PC로 접속해주세요.</SubMessage>
      <Image src={cryingAvb} alt="" />
    </MobileOverlay>
  ) : (
    <>
      <Helmet>
        <title>AvAb | 아브아브 - 빠르고 쉬운 레크레이션 검색 플랫폼</title>
        <meta
          name="description"
          content="함께하는 즐거움을 계획하고, 얼음같은 분위기를 깨트려 보세요! 레크레이션을 보다 쉽게, 아브아브"
        />
        <meta name="keywords" content="레크레이션, 아브아브, AvAb, 워크샵, MT, 모임, 이벤트" />
        <meta name="author" content="AvAb Team" />

        <meta property="og:title" content="아브아브 AvAb" />
        <meta
          property="og:description"
          content="함께하는 즐거움을 계획하고, 얼음같은 분위기를 깨트려 보세요! 레크레이션을 보다 쉽게, 아브아브"
        />
        <meta property="og:image" content="" />
        <meta property="og:url" content="https://avab.site" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="아브아브 AvAb" />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="아브아브 AvAb" />
        <meta
          name="twitter:description"
          content="함께하는 즐거움을 계획하고, 얼음같은 분위기를 깨트려 보세요! 레크레이션을 보다 쉽게, 아브아브"
        />
        <meta name="twitter:image" content="이미지 넣기" />
      </Helmet>
      <Header />
      <main className="main">
        <Outlet />
      </main>
      <Footer />
      {modalOpen ? <LoginModal /> : null}
    </>
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
