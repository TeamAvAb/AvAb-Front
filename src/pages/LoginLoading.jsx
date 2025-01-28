import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { privateAPI, publicAPI } from '../apis/user';
import LoadingSpinner from '../components/LoadingSpinner';
import useLoginStore from '../stores/loginStore';
import WithdrawRollbackModal from '../components/modal/WithdrawRollbackModal';
import useModal from '../hooks/useModal';

export default function LoginLoading() {
  const { isLoggedIn, setIsLoggedIn, setUserId, setAccessToken, setRefreshToken } = useLoginStore();
  const code = new URL(window.location.href).searchParams.get('code');
  const redirectURL = new URL(window.location.href).searchParams.get('state');
  const navigator = useNavigate();
  const { ModalWrapper, openModal, closeModal } = useModal();
  const [rollbackState, setRollbackState] = useState(false);

  useEffect(() => {
    kakaoLogin();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      getProfileImage();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (rollbackState) {
      openModal();
    }
  }, [rollbackState]);

  const kakaoLogin = async () => {
    try {
      let response;
      if (window.location.href.startsWith('http://localhost:3000')) {
        response = await publicAPI.get(`/api/auth/login/kakao/local?code=${code}`);
      } else {
        response = await publicAPI.get(`/api/auth/login/kakao?code=${code}`);
      }
      if (response.data.isSuccess === true) {
        if (response.data.result.isDeleted) {
          // 탈퇴 회원의 경우
          localStorage.setItem('accessTokenForRollback', response.data.result.accessToken);
          openModal();
        } else {
          setIsLoggedIn(true);
          setUserId(response.data.result.userId);
          setAccessToken(response.data.result.accessToken);
          setRefreshToken(response.data.result.refreshToken);
          if (redirectURL === '/api/auth/login/kakao') {
            navigator('/');
          } // 탈퇴 복구에서 이어지는 로그인
          else {
            navigator(redirectURL);
          }
        }
      }
    } catch (error) {
      console.log('로그인 요청 에러 : ', error);
    }
  };

  const getProfileImage = async () => {
    const response = await privateAPI.get('/api/users/me');
    if (response.data.isSuccess) {
      console.log(response.data);
      localStorage.setItem('userimage', response.data.result.profileImage);
    }
  };

  return (
    <>
      <LoadingSpinner
        comment={
          <span>
            로그인 중입니다.
            <br />
            잠시만 기다려주세요.
          </span>
        }
      />
      <ModalWrapper
        children={
          <WithdrawRollbackModal
            close={closeModal}
            rollbackState={rollbackState}
            setRollbackState={setRollbackState}
          />
        }
      ></ModalWrapper>
    </>
  );
}
