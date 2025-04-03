import React from 'react';
import { Backdrop } from './modal.style';
import { useLocation } from 'react-router';
import styled from 'styled-components';
import characterImg from '../../assets/character/kakaoAvb.png';
import closeIcon from '../../assets/common/x.svg';

import useLoginModalStore from '../../stores/loginModalStore';
import Button from '../common/button/Button';

export default function LoginModal() {
  const { pathname } = useLocation();
  const { modalControl } = useLoginModalStore((state) => state);
  const REST_API_KEY = import.meta.env.VITE_REST_API_KEY;
  let REDIRECT_URI;

  if (window.location.href.startsWith('http://localhost:3000/')) {
    REDIRECT_URI = import.meta.env.VITE_REDIRECT_URL_LOCAL;
  } else {
    REDIRECT_URI = import.meta.env.VITE_REDIRECT_URL;
  }

  let kakaoURL = `https://kauth.kakao.com/oauth/authorize?&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code&state=${pathname}&prompt=select_account`;
  const toKakaoLogin = () => {
    window.location.href = kakaoURL;
  };

  return (
    <Backdrop>
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
              <span style={{ fontWeight: '700' }}>성공적인 레크레이션</span>을 <br /> 경험해보세요!
            </Comment>
            <Button onClick={toKakaoLogin} backgroundColor="main01" color="main05" size="sm">
              간편 로그인하기
            </Button>
          </Text>
          <CharacterImg src={characterImg} alt="로그인하는 아브브" />
        </Content>
        <Controls>
          <CloseBtn onClick={modalControl}>
            <img src={closeIcon} alt="닫기" />
            닫기
          </CloseBtn>
        </Controls>
      </Modal>
    </Backdrop>
  );
}
const Modal = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 1.25rem;
  background: ${({ theme }) => theme.color.main05};
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  padding: 3.13rem 3.13rem 2.94rem 3.13rem;
  gap: 3.5rem;
  border-radius: 1.25rem 1.25rem 0 0;
  background: ${({ theme }) => theme.color.grayscale07};
`;
const Text = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.06rem;
`;
const Title = styled.span`
  color: ${({ theme }) => theme.color.grayscale01};
  font-size: ${({ theme }) => theme.text.h2.fontSize};
  font-weight: ${({ theme }) => theme.text.h2.fontWeight};
  line-height: normal;
`;

const Comment = styled.span`
  color: ${({ theme }) => theme.color.grayscale01};
  font-size: ${({ theme }) => theme.text.paragraph.fontSize};
  font-weight: ${({ theme }) => theme.text.paragraph.fontWeight};
  line-height: 1.875rem;
`;
const CharacterImg = styled.img`
  width: 15.56rem;
`;

const Controls = styled.div`
  height: 5.12rem;
  display: flex;
  justify-content: end;
  padding: 1.38rem;
  box-sizing: border-box;
`;

const CloseBtn = styled.button`
  display: flex;
  align-items: center;
  font-size: ${({ theme }) => theme.text.paragraph.fontSize};
  font-weight: ${({ theme }) => theme.text.paragraph.fontWeight};
`;
