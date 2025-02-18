import React from 'react';
import * as S from './modal.style';

export default function NicknameChangeModal({ handleModal }) {
  return (
    <S.Backdrop>
      <S.Modal>
        <S.Content>
          <S.Title>닉네임 변경을 완료했습니다!</S.Title>
          <S.BtnContainer>
            <S.BtnF onClick={() => handleModal(false)} backgroundColor="main02" color="main05">
              확인
            </S.BtnF>
          </S.BtnContainer>
        </S.Content>
        <S.CloseBtn onClick={() => handleModal(false)} />
      </S.Modal>
    </S.Backdrop>
  );
}
