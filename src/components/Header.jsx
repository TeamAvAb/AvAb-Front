import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import plus from "../assets/header/Icon.svg";
import AvAb from "../assets/header/AvAb.png";
import ProfileImg from "../assets/header/profileImg.png";
import useLoginStore from "../stores/loginStore";
import useLoginModalStore from "../stores/loginModalStore";

export default function Header() {
  const { isLoggedIn } = useLoginStore((state) => state);
  const { modalControl } = useLoginModalStore((state) => state);
  const navigate = useNavigate();
  const ToMainpage = () => {
    navigate(`/`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const ToRecreation = () => {
    navigate(`/search/list`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const ToFlowWrite = () => {
    navigate(`/flow/watch`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const ToMypage = () => {
    if (isLoggedIn) {
      navigate(`/mypage/myinfo`);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else modalControl();
  };

  return (
    <HeaderWrap>
      <LogoImg src={AvAb} onClick={ToMainpage} />
      <HeaderDetail onClick={ToMainpage}>메인페이지</HeaderDetail>
      <HeaderDetail onClick={ToRecreation}>레크레이션</HeaderDetail>
      <HeaderDetail onClick={ToFlowWrite}>일정플로우</HeaderDetail>
      <HeaderDetail onClick={ToMypage}>마이페이지</HeaderDetail>
      {isLoggedIn ? (
        <LogoutImg src={ProfileImg} onClick={ToMypage} />
      ) : (
        <>
          <PlusImg src={plus} />
          <Login onClick={() => modalControl()}>로그인</Login>
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
  width: 200px;
  height: 40px;
  margin-right: 55px;
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
