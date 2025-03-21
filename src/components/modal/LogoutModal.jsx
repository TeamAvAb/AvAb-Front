import React from 'react';
import styled from 'styled-components';
import * as S from './modal.style';
import cryingAvb from '../../assets/character/cryingAvb.png';
import useLoginStore from '../../stores/loginStore';
import { privateAPI } from '../../apis/user';
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
    <S.Backdrop>
      <S.Modal>
        <S.Content className="hasimage">
          <S.TitleContainer>
            <S.Title>로그아웃 하시게요?</S.Title>
            <S.SubTitle>더 많은 혜택이 기다리고 있어요.</S.SubTitle>
          </S.TitleContainer>
          <CharacterImg src={cryingAvb} alt="울고있는 아브브" />
          <S.BtnContainer className="btn-row">
            <S.ModalBtn
              onClick={handleLogout}
              className="btn-row"
              backgroundColor="main05"
              color="grayscale03"
              border
              borderColor="grayscale03"
            >
              로그아웃
            </S.ModalBtn>
            <S.ModalBtn
              onClick={() => handleModal(false)}
              className="btn-row"
              backgroundColor="main02"
              color="main05"
            >
              닫기
            </S.ModalBtn>
          </S.BtnContainer>
          <S.CloseBtn onClick={() => handleModal(false)} />
        </S.Content>
      </S.Modal>
    </S.Backdrop>
  );
}

const CharacterImg = styled.img`
  width: 15.5rem;
  margin-top: 0.4rem;
`;
