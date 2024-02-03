import React from 'react';
import styled from 'styled-components';

const WithoutSaving = ({ onClose }) => {
  return (
    <ModalOverlay>
      <ModalContent>
        <ModalTitle>
            일정 플로우를<br/>저장하세요!
        </ModalTitle>
        <ModalMessage>저장한 플로우를 수정할 수 있어요.</ModalMessage>
        <ModalSaveButton onClick={onClose}>저장하기</ModalSaveButton>
        <ModalNoSaveButton onClick={onClose}>저장하지 않고 나가기</ModalNoSaveButton>
      </ModalContent>
    </ModalOverlay>
  );
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(70, 76, 82, 0.8);
  z-index: 1000;
`;

const ModalContent = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 440px;
  height: 435px;
  background-color: #FFF;
  border: 0.5px solid #CACDD2;
  border-radius: 20px;
  z-index: 1001;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;


const ModalTitle = styled.h2`
  font-size: 36px;
  font-weight: 700;
  white-space: pre-line;
  text-align: center;
`;

const ModalMessage = styled.p`
  font-size: 20px;
  text-align: center;
  margin-top: 8px;
`;

const ModalSaveButton = styled.button`
  width: 223px;
  height: 54px;
  background-color: #4036ED;
  padding: 15px 34px;
  border: none;
  border-radius: 50px;
  font-size: 20px;
  font-weight: 700;
  color: #fff;
  cursor: pointer;
  margin-top: 60px;

  /* 선택적으로 hover 효과 추가 */
  &:hover {
    background-color: #3530ED; /* hover 시의 배경색 변경 */
  }
`;

const ModalNoSaveButton = styled.button`
  width: 223px;
  height: 54px;
  background-color: #fff;
  border: 1px solid #464C52;
  border-radius: 50px;
  font-size: 20px;
  font-weight: 700;
  color: #464C52;
  cursor: pointer;
  margin-top: 40px;

  /* 선택적으로 hover 효과 추가 */
  &:hover {
    background-color: #F7F8F9; /* hover 시의 배경색 변경 */
  }
`;

export default WithoutSaving;
