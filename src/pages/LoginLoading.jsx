import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { privateAPI, publicAPI } from "../apis/user";
import LoadingSpinner from "../components/LoadingSpinner";
import useLoginStore from "../stores/loginStore";
import useLoginModalStore from "../stores/loginModalStore";
import userDeleteRollback from "../apis/userDeleteRollback";

export default function LoginLoading() {
  const {
    isLoggedIn,
    setIsLoggedIn,
    setUserId,
    setAccessToken,
    setRefreshToken,
  } = useLoginStore();
  const { modalControl } = useLoginModalStore();
  const code = new URL(window.location.href).searchParams.get("code");
  const redirectURL = new URL(window.location.href).searchParams.get("state");
  const navigator = useNavigate();

  useEffect(() => {
    kakaoLogin();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      getProfileImage();
    }
  }, [isLoggedIn]);

  const kakaoLogin = async () => {
    try {
      let response;
      if (window.location.href.startsWith("http://localhost:3000")) {
        response = await publicAPI.get(
          `/api/auth/login/kakao/local?code=${code}`
        );
      } else {
        response = await publicAPI.get(`/api/auth/login/kakao?code=${code}`);
      }
      if (response.data.isSuccess === true) {
        if (response.data.result.isDeleted) {
          // 탈퇴 회원의 경우
          localStorage.setItem(
            "accessTokenForRollback",
            response.data.result.accessToken
          );
          if (window.confirm("계정을 복구하시겠어요?")) {
            if (userDeleteRollback()) {
              modalControl(); // 로그인 모달 열기
            }
          }
        } else {
          setIsLoggedIn(true);
          setUserId(response.data.result.userId);
          setAccessToken(response.data.result.accessToken);
          setRefreshToken(response.data.result.refreshToken);
          if (redirectURL === "/api/auth/login/kakao")
            navigator("/"); // 탈퇴 복구에서 이어지는 로그인
          else navigator(redirectURL);
        }
      }
    } catch (error) {
      console.log("로그인 요청 에러 : ", error);
    }
  };

  const getProfileImage = async () => {
    const response = await privateAPI.get("/api/users/me");
    if (response.data.isSuccess) {
      console.log(response.data);
      localStorage.setItem("userimage", response.data.result.profileImage);
    }
  };

  return (
    <LoadingSpinner
      comment={
        <span>
          로그인 중입니다.
          <br />
          잠시만 기다려주세요.
        </span>
      }
    />
  );
}
