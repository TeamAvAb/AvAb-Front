import React from "react";
import styled from "styled-components";
export default function KeywordModal({ closeModal }) {
  const keywords = [1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <Modal>
      <Keywords>
        {keywords.map((el) => {
          <Keyword>{el}</Keyword>;
        })}
      </Keywords>
      <SetModal>
        <ModalBtn onClick={() => closeModal(false)}>닫기</ModalBtn>
        <ModalBtn>선택 완료</ModalBtn>
      </SetModal>
    </Modal>
  );
}

const Modal = styled.div`
  position: absolute;
  top: 363px;
  width: 760px;
  border-radius: 20px;
  background: var(--main-ffffff, #fff);
  box-shadow: 0px -2px 8px 0px rgba(0, 0, 0, 0.2) inset;
`;
const Keywords = styled.div`
  height: 250px;
  box-shadow: 0px -2px 8px 0px rgba(0, 0, 0, 0.2) inset;
  display: flex;
  flex-direction: row;
`;
const Keyword = styled.div`
  width: 111px;
  height: 29px;
`;
const SetModal = styled.div`
  display: flex;
  flex-direction: row;
`;
const ModalBtn = styled.button`
  width: 103px;
  height: 54px;
  display: flex;
  padding: 15px 34px;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  border: 1px solid var(--gray-scale-1-b-1-d-1-f, #1b1d1f);
  background: var(--main-ffffff, #fff);
  color: var(--gray-scale-1-b-1-d-1-f, #1b1d1f);
  text-align: right;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
`;
