import React from 'react';
import FooterP from '../../assets/Footer/FooterP.svg';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useLoginStore from '../../stores/loginStore';
import useLoginModalStore from '../../stores/loginModalStore';
import FooterNav from './FooterNav';
import Button from '../button/Button';
import FooterCopyright from './FooterCopyright';
import FooterContainer from './FooterContainer';

export default function Footer() {
  const { isLoggedIn } = useLoginStore((state) => state);
  const { modalControl } = useLoginModalStore((state) => state);

  const navigate = useNavigate();
  const ToMainpage = () => {
    navigate(`/`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const ToRecreation = () => {
    navigate(`/search/list`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const ToFlowWrite = () => {
    navigate(`/flow/watch`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const ToMypage = () => {
    if (isLoggedIn) {
      navigate(`/mypage/myinfo`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      modalControl();
    }
  };
  const ToInstagram = () => {
    window.open('https://www.instagram.com/avab.ovo/', 'Avab Instagram');
  };
  return (
    <FooterContainer>
      <MainSection>
        <OpinionImg src={FooterP}></OpinionImg>
        <OpinionMsgContainer>
          <OpinionMsg>
            <BoldSpan>아브아브</BoldSpan>에게
            <br />
            의견을 보내주세요
          </OpinionMsg>
          <Button onClick={ToInstagram} backgroundColor="main01" color="main05">
            의견 보내러 가기
          </Button>
        </OpinionMsgContainer>
      </MainSection>
      <FooterNav />
      <Divider />
      <FooterCopyright />
    </FooterContainer>
  );
}

const MainSection = styled.section`
  display: flex;
  justify-content: end;
  position: relative;
  margin-bottom: 2rem;
  width: 100%;
`;

const OpinionImg = styled.img`
  position: absolute;
  width: 26rem;
  left: 0;
  bottom: -2rem;
`;

const OpinionMsgContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  gap: 1.5rem;
  margin-right: 3rem;
`;

const OpinionMsg = styled.span`
  font-size: 3rem;
  text-align: right;
  line-height: 1.2;
`;

const BoldSpan = styled.span`
  font-size: 3rem;
  font-weight: 600;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: ${({ theme }) => theme.color.grayscale04};
`;
