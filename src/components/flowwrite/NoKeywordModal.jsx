import React from 'react';
import styled from 'styled-components';
import close from '../../assets/flowwrite/close_modal.png'

const NoKeyword = ({ onClose }) => {
  return (
    <ModalOverlay>
      <ModalContent>
      <CloseButtonContainer>
        <ModalCloseButton onClick={onClose} src={close} alt="Close" />
      </CloseButtonContainer>
        <ModalTitle>
        레크레이션의<br/>모든 키워드를<br/>입력해주세요!
        </ModalTitle>
        <ModalMessage>입력하지 않은 키워드가 있어요.</ModalMessage>
        <ModalFixButton onClick={onClose}>키워드 입력하기</ModalFixButton>
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

const CloseButtonContainer = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
`;

const ModalCloseButton = styled.img`
  width: 42px;
  height: 42px;
  cursor: pointer;
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

const ModalFixButton = styled.button`
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

export default NoKeyword;
