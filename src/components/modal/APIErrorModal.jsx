import React from 'react';
import * as S from './modal.style';
import useErrorStore from '../../stores/errorStore';

export default function APIErrorModal() {
  const { status, resetError } = useErrorStore();
  const moveToHome = () => {
    resetError();
    window.location.href = '/';
  };

  if (status >= 500) {
    // 서버 에러
    return (
      <S.Modal>
        <S.Content>
          <S.TitleContainer>
            <S.Title>서버 에러가 발생했습니다.</S.Title>
            <S.SubTitle>잠시 후에 다시 시도해주세요.</S.SubTitle>
          </S.TitleContainer>
          <S.BtnContainer>
            <S.ModalBtn backgroundColor="main02" color="main05" onClick={moveToHome}>
              홈으로 이동하기
            </S.ModalBtn>
          </S.BtnContainer>
        </S.Content>
      </S.Modal>
    );
  } else if (status === 'Network Error') {
    // 네트워크 에러
    return (
      <S.Modal>
        <S.Content>
          <S.TitleContainer>
            <S.Title>네트워크 에러가 발생했습니다.</S.Title>
            <S.SubTitle>인터넷 연결을 확인해주세요.</S.SubTitle>
          </S.TitleContainer>
          <S.BtnContainer>
            <S.ModalBtn
              onClick={() => window.location.reload()}
              backgroundColor="main02"
              color="main05"
            >
              새로고침
            </S.ModalBtn>
          </S.BtnContainer>
        </S.Content>
      </S.Modal>
    );
  } else {
    // 기타 에러
    return (
      <S.Modal>
        <S.Content>
          <S.TitleContainer>
            <S.Title>알 수 없는 에러가 발생했습니다.</S.Title>
            <S.SubTitle>잠시 후에 다시 시도해주세요.</S.SubTitle>
          </S.TitleContainer>
          <S.BtnContainer>
            <S.ModalBtn backgroundColor="main02" color="main05" onClick={moveToHome}>
              홈으로 이동하기
            </S.ModalBtn>
            <S.ModalBtn
              onClick={() => window.location.reload()}
              backgroundColor="main05"
              color="grayscale03"
              border
              borderColor="grayscale03"
            >
              새로고침
            </S.ModalBtn>
          </S.BtnContainer>
        </S.Content>
      </S.Modal>
    );
  }
}
