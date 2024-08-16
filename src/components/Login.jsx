import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import styled from "styled-components";
import character from "../assets/main/login_character.png";
import elipseImg from "../assets/main/elipse.svg";
import closeImg from "../assets/main/closeIcon.svg";
import x from "../assets/main/x.svg";

export default function Login({ handleLoginStatus, handleLoginModal }) {
  const { pathname } = useLocation();
  const [temporaryClose, setTemporaryClose] = useState(false);
  const REST_API_KEY = process.env.REACT_APP_REST_API_KEY;
  const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URL;
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code&state=${pathname}`;
  const toKakaoLogin = () => {
    window.location.href = kakaoURL;
  };

  return (
    <Container>
      <Modal>
        <Content>
          <Text>
            <Title>
              아브아브를 <br />
              시작해보세요!
            </Title>
            <Comment>
              카카오 계정으로 <br />
              간편하게 로그인을 하고 <br />
              <span style={{ fontWeight: "700" }}>
                성공적인 레크레이션
              </span>을 <br /> 경험해보세요!
            </Comment>
            <Button onClick={toKakaoLogin}>간편 로그인하기</Button>
          </Text>
          <img
            src={character}
            style={{ width: "249px", height: "286px", objectFit: "cover" }}
          />
        </Content>
        <Controls>
          <Control onClick={() => setTemporaryClose((prev) => !prev)}>
            {temporaryClose ? (
              <img src={x} />
            ) : (
              <img src={elipseImg} style={{ width: "38px", height: "38px" }} />
            )}
            오늘 하루 보지 않기
          </Control>
          <Control onClick={() => handleLoginModal(false)}>
            <img src={closeImg} style={{ width: "24px", height: "25px" }} />
            닫기
          </Control>
        </Controls>
      </Modal>
    </Container>
  );
}
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  background: var(--shadow, rgba(70, 76, 82, 0.5));
  z-index: 999;
`;
const Modal = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 126px;
  width: 669px;
  border-radius: 20px;
  background: var(--main-ffffff, #fff);
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  padding: 50px 50px 47px 50px;
  gap: 56px;
  border-radius: 20px;
  background: var(--gray-scale-f-7-f-8-f-9, #f7f8f9);
`;
const Text = styled.div`
  display: flex;
  flex-direction: column;
  gap: 33px;
`;
const Title = styled.span`
  color: #000;
  font-size: 48px;
  font-weight: 700;
`;

const Comment = styled.span`
  font-size: 20px;
  font-weight: 400;
  line-height: 30px;
`;

const Button = styled.button`
  width: max-content;
  padding: 9px 24px;
  border: none;
  border-radius: 20px;
  background: var(--main-d-9-d-9-d-9, #19297c);
  color: #fff;
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  cursor: pointer;
`;
const Controls = styled.div`
  display: inline-flex;
  justify-content: space-between;
  height: 25px;
  padding: 22px;
  color: var(--gray-scale-464-c-52, #464c52);
  font-size: 20px;
  font-weight: 400;
`;

const Control = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`;
