import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import plus from '../assets/header/Icon.svg'
import circle from '../assets/header/Logout.svg'
import none from '../assets/Footer/none.png'

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
    navigate(`/search/list`);
  };
  const ToFlowWrite = () => {
    navigate(`/flow/watch`);
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
      {isLoggedIn ? 
      ( <> <LogoutImg src={circle} onClick={ToMypage}/> </> ) : 
      ( <>
          <PlusImg src={plus}/>
          <Login onClick={handleLogin}>로그인</Login>
        </>
      )}
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
  z-index: 999;
`;

const LogoImg = styled.img`
  width: 40px;
  height: 40px;
`;

const Logo = styled.div`
  padding: 15px;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 150px;
  font-size: 22px;
  font-weight: 600;
`;

const PlusImg = styled.img`
  width: 12px;
  margin-left: 120px;
`;

const Login = styled.div`
  display: flex;
  justify-content: center;
  width: 80px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 19px;
  font-weight: 600;
`;

const LogoutImg = styled.img`
  width: 42px;
  margin-left: 150px;
  margin-right: 20px;
  cursor: pointer;
`;

const HeaderDetail = styled.div`
  font-size: 20px;
  margin-left: 55px;
  margin-right: 55px;
  cursor: pointer;
`;
