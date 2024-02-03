import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import none from "../assets/Footer/none.png";

export default function Header({
  isLoggedIn,
  handleLoginStatus,
  handleLoginModal,
}) {
  const navigate = useNavigate();
  const handleLogin = () => {
    if (isLoggedIn) {
      handleLoginStatus(false);
    } else {
      handleLoginModal(true);
    }
  };
  const ToMainpage = () => {
    navigate(`/`);
  };
  const ToRecreation = () => {
    navigate(`/recreation/detail`);
  };
  const ToFlowWrite = () => {
    navigate(`/flow/write`);
  };
  const ToMypage = () => {
    navigate(`/mypage`);
  };

  return (
    <HeaderWrap>
      <LogoImg src={none} />
      <Logo>Avab</Logo>
      <HeaderDetail onClick={ToMainpage}>메인페이지</HeaderDetail>
      <HeaderDetail onClick={ToRecreation}>레크레이션</HeaderDetail>
      <HeaderDetail onClick={ToFlowWrite}>일정플로우</HeaderDetail>
      <HeaderDetail onClick={ToMypage}>마이페이지</HeaderDetail>
      <Login onClick={handleLogin}>{isLoggedIn ? "로그아웃" : "로그인"}</Login>
    </HeaderWrap>
  );
}

const HeaderWrap = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 3px 3px #abaaae;
  position: relative;
  height: 67px;
  width: 1536px;
`;

const LogoImg = styled.img`
  width: 40px;
  height: 40px;
`;

const Logo = styled.div`
  padding: 15px;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10%;
  font-size: 22px;
  font-weight: 600;
`;

const Login = styled.div`
  display: flex;
  justify-content: center;
  width: 70px;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10%;
  font-size: 17px;
  font-weight: 550;
`;

const HeaderDetail = styled.div`
  font-size: 20px;
  margin-left: 3%;
  margin-right: 3%;
  cursor: pointer;
`;
