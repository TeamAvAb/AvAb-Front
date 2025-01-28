import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import plus from '../../assets/header/Icon.svg';
import AvAb from '../../assets/header/AvAb.png';
import ProfileImg from '../../assets/header/profileImg.png';
import useLoginStore from '../../stores/loginStore';
import useLoginModalStore from '../../stores/loginModalStore';
import Navigation from './Navigation';

export default function Header() {
  const { isLoggedIn } = useLoginStore((state) => state);
  const { modalControl } = useLoginModalStore((state) => state);
  const profileImage = () => {
    if (localStorage.getItem('userImgage') !== null) {
      return localStorage.getItem('userImgage');
    } else {
      return ProfileImg;
    }
  };
  const navigate = useNavigate();
  const ToMainpage = () => {
    navigate(`/`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const ToRecreation = () => {
    navigate(`/search/list`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const ToFlowWrite = () => {
    navigate(`/flow/watch`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const ToMypage = () => {
    if (isLoggedIn) {
      navigate(`/mypage/myinfo`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      modalControl();
    }
  };

  return (
    <HeaderContainer>
      <LogoImg src={AvAb} onClick={ToMainpage} />
      <Navigation />
      {isLoggedIn ? (
        <LogoutImg src={profileImage()} onClick={ToMypage} />
      ) : (
        <>
          <PlusImg src={plus} />
          <Login onClick={() => modalControl()}>로그인</Login>
        </>
      )}
    </HeaderContainer>
  );
}

const HeaderContainer = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  position: relative;
  height: 4rem;
`;

const LogoImg = styled.img`
  width: 12.5rem;
  margin-right: 3.5rem;
  cursor: pointer;
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
  margin-left: 130px;
  cursor: pointer;
`;

const HeaderDetail = styled.div`
  font-size: 20px;
  margin-left: 55px;
  margin-right: 55px;
  cursor: pointer;
`;
