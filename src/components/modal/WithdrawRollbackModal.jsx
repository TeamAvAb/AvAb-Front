import React from 'react';
import userDeleteRollback from '../../apis/userDeleteRollback';
import { useNavigate } from 'react-router';
import x from '../../assets/main/closeIcon.svg';
import * as S from './modal.style';
export default function WithdrawRollbackModal({ close, rollbackState, setRollbackState }) {
  const navigator = useNavigate();
  const deleteRollback = async () => {
    try {
      const response = await userDeleteRollback();
      if (response) {
        console.log('복구 완료');
        setRollbackState(true);
        close();
      } else {
        console.log('복구 중 에러 발생', response);
      }
    } catch (error) {
      throw new Error('복구 실패', error);
    }
  };
  const navigateLogin = () => {
    close();
    navigator('/');
  };
  return (
    <S.Modal>
      <S.Content>
        {rollbackState ? (
          <>
            <S.TitleContainer>
              <S.Title>계정이 복구되었습니다!</S.Title>
              <S.SubTitle>다시 로그인해주세요.</S.SubTitle>
            </S.TitleContainer>
            <S.BtnContainer>
              <S.BtnF onClick={navigateLogin}>네</S.BtnF>
            </S.BtnContainer>
            <S.CloseBtn onClick={navigateLogin} src={x} />
          </>
        ) : (
          <>
            <S.TitleContainer>
              <S.Title>계정을 복구하시겠습니까?</S.Title>
              <S.SubTitle>
                탈퇴 후 30일이 경과하지 않아 기존 계정으로 복구할 수 있습니다.
              </S.SubTitle>
            </S.TitleContainer>
            <S.BtnContainer>
              <S.BtnF onClick={deleteRollback}>네</S.BtnF>
              <S.BtnB onClick={navigateLogin}>아니요</S.BtnB>
            </S.BtnContainer>
            <S.CloseBtn onClick={navigateLogin} src={x} />
          </>
        )}
      </S.Content>
    </S.Modal>
  );
}
