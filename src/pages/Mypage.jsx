import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import MyInfoBox from '../components/mypage/MyInfoBox';
import { Helmet } from 'react-helmet';
import LogoutModal from '../components/modal/LogoutModal';

export default function Mypage() {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleMyInfoClick = () => {
    navigate(`/mypage/myinfo`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFavoritesClick = () => {
    navigate(`/mypage/favorites`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Container>
      <Helmet>
        <title>AvAb | 마이페이지 - 내 정보 관리</title>
        <meta
          name="description"
          content="마이페이지에서 내 정보를 관리하고, 즐겨찾는 레크레이션을 확인할 수 있습니다."
        />
        <meta property="og:title" content="마이페이지 - 내 정보 관리" />
        <meta
          property="og:description"
          content="마이페이지에서 내 정보를 관리하고, 즐겨찾는 레크레이션을 확인할 수 있습니다."
        />
      </Helmet>
      <SideBar>
        <Title>마이페이지</Title>
        <MenuList>
          <MenuItem style={{ backgroundColor: '#B1BEFF' }} onClick={handleMyInfoClick}>
            내 정보
          </MenuItem>
          <MenuItem onClick={handleFavoritesClick}>즐겨 찾는 레크레이션</MenuItem>
          <MenuItem onClick={() => setIsLogoutModalOpen(true)}>로그아웃</MenuItem>
        </MenuList>
      </SideBar>
      <Content>{<MyInfoBox />}</Content>

      {/*우측 바*/}
      <RightSide />

      {/*로그아웃 모달*/}
      {isLogoutModalOpen && <LogoutModal handleModal={setIsLogoutModalOpen}></LogoutModal>}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
`;

const SideBar = styled.div`
  width: 320px;
  height: 713px;
  box-sizing: border-box;
  font-size: 22px;
  border: solid #cacdd2 1px;
  border-bottom: none;
  border-right: none;
  color: #1b1d1f;
`;

const Title = styled.div`
  width: 260px;
  padding: 30px;
  font-size: 22px;
`;

const MenuList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: solid #cacdd2 1px;
  border-left: none;
  border-right: none;
`;

const MenuItem = styled.div`
  text-align: center;
  cursor: pointer;
  padding: 20px;
  width: 280px;
  border-bottom: solid #cacdd2 1px;
`;

const Content = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  border: solid #cacdd2 1px;
  border-bottom: none;
`;

const RightSide = styled.div`
  width: 5.7325%;
  background-color: #f7f8f9;
`;
