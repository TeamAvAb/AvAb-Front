import React, { useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";
import axios from "axios";
import { FadeLoader } from "react-spinners";

export default function LoginLoading({ handleLogin }) {
  const code = new URL(window.location.href).searchParams.get("code");
  const navigator = useNavigate();

  useEffect(() => {
    kakaoLogin();
  }, []);

  const kakaoLogin = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: `https://dev.avab.shop/api/auth/login/kakao?code=${code}`,
      });
      console.log("응답 : ", response);
      localStorage.setItem("accessToken", response.data.result.accessToken);
      localStorage.setItem("refreshToken", response.data.result.refreshToken);
      localStorage.setItem("userId", response.data.result.userId);
      if (response.data.isSuccess === true) handleLogin(true);
      navigator("/");
    } catch (error) {
      console.log("에러 : ", error);
    }
  };

  return (
    <Loading>
      <FadeLoader />
      <div>잠시만 기다려주세요.</div>
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
