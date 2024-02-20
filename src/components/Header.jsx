import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { privateAPI } from "../apis/user";

import plus from '../assets/header/Icon.svg'
import AvAb from '../assets/header/AvAb.png'

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
    navigate(`/mypage/myinfo`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const UserImg = localStorage.getItem("userimage");

  // 데이터 가져오기
  const [datas, setDatas] = useState([]);
  // 데이터 불러오는 동안 로딩
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const call = async () => {
      setLoading(true);
      try{
        const response = await privateAPI.get(`/api/users/me`);
        setDatas(response.data.result);
        setLoading(false);
      } catch (error) {
        console.log("내 정보 로드 요청 에러 : ", error);
      }
    };
    call();
  }, []);

  return (
    <HeaderWrap>
      <LogoImg src={AvAb} />
      <HeaderDetail onClick={ToMainpage}>메인페이지</HeaderDetail>
      <HeaderDetail onClick={ToRecreation}>레크레이션</HeaderDetail>
      <HeaderDetail onClick={ToFlowWrite}>일정플로우</HeaderDetail>
      <HeaderDetail onClick={ToMypage}>마이페이지</HeaderDetail>
      {isLoggedIn ? (
        <LogoutImg src={UserImg} onClick={ToMypage} />
      ) : (
        <>
          <PlusImg src={plus} />
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
  width: 200px;
  height: 40px;
  margin-right: 55px;
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
