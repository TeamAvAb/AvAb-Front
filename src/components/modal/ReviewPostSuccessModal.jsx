import React from 'react';
import * as S from './modal.style';

export default function ReviewPostSuccessModal({ handleModal }) {
  return (
    <S.Backdrop>
      <S.Modal>
        <S.Content>
          <S.Title>리뷰를 등록했습니다!</S.Title>
          <S.BtnContainer>
            <S.ModalBtn onClick={() => handleModal(false)} backgroundColor="main02" color="main05">
              확인
            </S.ModalBtn>
          </S.BtnContainer>
        </S.Content>
        <S.CloseBtn onClick={() => handleModal(false)} />
      </S.Modal>
    </S.Backdrop>
  );
}
