import React, { useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";
import { publicAPI } from "../apis/user";
import { PacmanLoader } from "react-spinners";

export default function LoginLoading({ handleLogin }) {
  const code = new URL(window.location.href).searchParams.get("code");
  const redirectURL = new URL(window.location.href).searchParams.get("state");

  const navigator = useNavigate();

  useEffect(() => {
    kakaoLogin();
  }, []);

  const kakaoLogin = async () => {
    try {
      const response = await publicAPI.get(
        `/api/auth/login/kakao?code=${code}`
      );
      localStorage.setItem("accessToken", response.data.result.accessToken);
      localStorage.setItem("refreshToken", response.data.result.refreshToken);
      localStorage.setItem("userId", response.data.result.userId);
      if (response.data.isSuccess === true) handleLogin(true);
      navigator(redirectURL);
    } catch (error) {
      console.log("로그인 요청 에러 : ", error);
    }
  };

  return (
    <Loading>
      <PacmanLoader />
      <div style={{ fontSize: "22px", textAlign: "center" }}>
        로그인 중입니다 <br /> 잠시만 기다려주세요
      </div>
    </Loading>
  );
}

const Loading = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 40px;
`;
