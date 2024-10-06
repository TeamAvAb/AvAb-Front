import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import MyInfoBox from "../components/mypage/MyInfoBox";
import LogoutP from "../assets/mypage/LogoutImg.svg";
import { privateAPI } from "../apis/user";
import { Helmet } from "react-helmet";

export default function Mypage({ handleLogin }) {
  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleMyInfoClick = () => {
    navigate(`/mypage/myinfo`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFavoritesClick = () => {
    navigate(`/mypage/favorites`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openLogoutModal = () => {
    setLogoutModalOpen(true);
  };

  const closeLogoutModal = () => {
    setLogoutModalOpen(false);
  };

  const handleLogout = async () => {
    try {
      const response = await privateAPI.delete("/api/auth/logout");
      localStorage.clear();
      navigate("/");
    } catch (error) {
      console.log("로그아웃 요청 에러 : ", error);
    }
    handleLogin(false);
    setLogoutModalOpen(false);
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
          <MenuItem
            style={{ backgroundColor: "#B1BEFF" }}
            onClick={handleMyInfoClick}
          >
            내 정보
          </MenuItem>
          <MenuItem onClick={handleFavoritesClick}>
            즐겨 찾는 레크레이션
          </MenuItem>
          <MenuItem onClick={openLogoutModal}>로그아웃</MenuItem>
        </MenuList>
      </SideBar>
      <Content>{<MyInfoBox />}</Content>

      {/*우측 바*/}
      <RightSide />

      {/*로그아웃 모달*/}
      {isLogoutModalOpen && (
        <LogoutModal>
          <ModalContent>
            <ModalTitle>로그아웃 하시게요?</ModalTitle>
            <SemiTitle>더 많은 혜택이 기다리고 있어요.</SemiTitle>
            <LogoutImg src={LogoutP} />
            <ModalBut>
              <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
              <CloseButton onClick={closeLogoutModal}>닫기</CloseButton>
            </ModalBut>
          </ModalContent>
        </LogoutModal>
      )}
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

const LogoutModal = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  z-index: 999;
`;

const ModalContent = styled.div`
  background-color: #f7f8f9;
  width: 400px;
  height: 395px;
  padding: 20px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 230px;
`;

const ModalTitle = styled.div`
  font-size: 30px;
  font-weight: 600;
`;

const SemiTitle = styled.div`
  font-size: 17px;
  font-weight: 600;
  margin-top: 10px;
`;

const LogoutImg = styled.img`
  width: 200px;
  height: 210px;
  margin-top: 10px;
  margin-bottom: 20px;
`;

const ModalBut = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 20px;
  border-top: solid gray 1px;
  width: 440px;
`;

const LogoutButton = styled.div`
  display: flex;
  justify-content: center;
  border: solid black 1px;
  padding: 12px 10px;
  border-radius: 30px;
  width: 110px;
  font-weight: 600;
  cursor: pointer;
`;

const CloseButton = styled(LogoutButton)`
  background-color: #4036ed;
  color: white;
  border: none;
  margin-left: 80px;
`;
