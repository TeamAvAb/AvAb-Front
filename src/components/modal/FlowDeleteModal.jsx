import React, { useState } from 'react';
import styled from 'styled-components';
import * as S from './modal.style';
import { privateAPI } from '../../apis/user';
import xIcon from '../../assets/X.svg';

export default function FlowDeleteModal({ close, refetch }) {
  const [deleteComplete, setDeleteComplete] = useState(false);
  const flowId = localStorage.getItem('flowDeleteTarget');

  const deleteFlow = async () => {
    try {
      const response = await privateAPI.delete(`/api/flows/${flowId}`);
      if (response.status === 200) {
        setDeleteComplete(true);
      } else {
        console.log('플로우 삭제 실패', response);
        alert('삭제 실패');
      }
    } catch (error) {
      throw new Error('flow delete error', error);
    }
  };

  const confirmDelete = () => {
    close();
    refetch();
  };

  return (
    <Container>
      <S.Modal>
        <S.Content>
          <S.TitleContainer>
            {deleteComplete ? (
              <S.Title>일정 플로우를 삭제했습니다!</S.Title>
            ) : (
              <>
                <S.Title>일정 플로우를 삭제하시겠습니까?</S.Title>
                <S.SubTitle>삭제한 플로우를 다시 복구할 수 없습니다.</S.SubTitle>
              </>
            )}
          </S.TitleContainer>
          <S.BtnContainer>
            {deleteComplete ? (
              <S.BtnF onClick={() => confirmDelete()}>확인</S.BtnF>
            ) : (
              <>
                <S.BtnF onClick={() => deleteFlow(flowId)}>삭제하기</S.BtnF>
                <S.BtnB onClick={() => close()}>실행 취소하기</S.BtnB>
              </>
            )}
          </S.BtnContainer>
        </S.Content>
        <S.CloseBtn onClick={deleteComplete ? () => confirmDelete() : () => close()} src={xIcon} />
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
