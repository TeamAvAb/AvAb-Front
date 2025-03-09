import React, { useState } from 'react';
import * as S from './modal.style';
import { privateAPI } from '../../apis/user';

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
            <S.ModalBtn onClick={() => confirmDelete()} backgroundColor="main02" color="main05">
              확인
            </S.ModalBtn>
          ) : (
            <>
              <S.ModalBtn
                onClick={() => deleteFlow(flowId)}
                backgroundColor="main02"
                color="main05"
              >
                삭제하기
              </S.ModalBtn>
              <S.ModalBtn
                onClick={() => close()}
                backgroundColor="main05"
                color="grayscale03"
                border
                borderColor="grayscale03"
              >
                실행 취소하기
              </S.ModalBtn>
            </>
          )}
        </S.BtnContainer>
      </S.Content>
      <S.CloseBtn onClick={deleteComplete ? () => confirmDelete() : () => close()} />
    </S.Modal>
  );
}
