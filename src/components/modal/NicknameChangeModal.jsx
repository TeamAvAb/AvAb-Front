import React from 'react';
import styled from 'styled-components';
import x from '../../assets/main/closeIcon.svg';
import * as S from './modal.style';

export default function NicknameChangeModal({ handleModal }) {
  return (
    <Container>
      <S.Modal>
        <S.Content>
          <S.Title>닉네임 변경을 완료했습니다!</S.Title>
          <S.BtnContainer>
            <S.BtnF onClick={() => handleModal(false)}>확인</S.BtnF>
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
