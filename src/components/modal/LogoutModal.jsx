import React from 'react';
import styled from 'styled-components';
import x from '../../assets/main/closeIcon.svg';
import * as S from './modal.style';
import LogoutP from '../../assets/mypage/LogoutImg.svg';
import { privateAPI } from '../../apis/user';
import useLoginStore from '../../stores/loginStore';
import { useNavigate } from 'react-router-dom';
import SITE_URL from '../../constants/url';

export default function LogoutModal({ handleModal }) {
  const { logout } = useLoginStore();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const response = await privateAPI.delete('/api/auth/logout');
      if (response.data.isSuccess === true) {
        navigate(SITE_URL.MAIN);
        localStorage.clear();
        logout();
      } else {
        alert('로그아웃 요청 에러가 발생했습니다!');
        console.log(response);
      }
    } catch (error) {
      console.log('로그아웃 요청 에러 : ', error);
    }
    handleModal(false);
  };
  return (
    <Container>
      <S.Modal>
        <S.Content className="hasimage">
          <S.TitleContainer>
            <S.Title>로그아웃 하시게요?</S.Title>
            <S.SubTitle>더 많은 혜택이 기다리고 있어요.</S.SubTitle>
          </S.TitleContainer>
          <LogoutImg src={LogoutP} />
          <S.BtnContainer className="btn-row">
            <S.BtnB onClick={handleLogout} className="btn-row">
              로그아웃
            </S.BtnB>
            <S.BtnF onClick={() => handleModal(false)} className="btn-row">
              닫기
            </S.BtnF>
          </S.BtnContainer>
        </S.Content>
        <S.CloseBtn onClick={() => handleModal(false)} src={x} />
      </S.Modal>
    </Container>
  );
}
const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  z-index: 999;
`;
const LogoutImg = styled.img`
  width: 200px;
  height: 210px;
  margin-bottom: 20px;
`;
