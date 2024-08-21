import React from "react";
import styled from "styled-components";
import x from "../../assets/main/closeIcon.svg";

export default function NicknameChangeModal({ handleModal }) {
  return (
    <Container>
      <Modal>
        <Comment>
          닉네임 변경을 <br /> 완료했습니다!
        </Comment>
        <Btn onClick={() => handleModal(false)}>확인</Btn>
        <CloseBtn onClick={() => handleModal(false)} src={x} />
      </Modal>
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
const Modal = styled.div`
  width: 440px;
  height: 435px;

  display: flex;
  flex-direction: column;
  gap: 60px;

  background-color: #f7f8f9;
  width: 400px;
  height: 395px;
  padding: 20px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 230px;
  position: relative;
`;

const Comment = styled.span`
  color: #000;
  text-align: center;

  font-family: Pretendard;
  font-size: 36px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const Btn = styled.button`
  display: flex;
  width: 223px;
  padding: 15px 34px;
  justify-content: center;
  align-items: center;
  gap: 10px;

  border: none;
  border-radius: 50px;
  background: var(--main-4036-ed, #4036ed);
  color: var(--main-ffffff, #fff);
  text-align: center;

  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const CloseBtn = styled.img`
  position: absolute;
  top: 20px;
  right: 20px;
`;
