import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useLoginStore from '../../stores/loginStore';
import useLoginModalStore from '../../stores/loginModalStore';
import FooterNav from './FooterNav';
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
  return (
    <FooterContainer>
      <FooterNav />
      <Divider />
      <FooterCopyright />
    </FooterContainer>
  );
}

const FooterWrap = styled.footer`
  position: relative;
  background-color: #e9ebed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const High = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 2px solid #9fa4a9;
  width: 1080px;
`;

const DetailsWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1050px;
  height: 67px;
  margin-top: 10px;
`;

const Details = styled.div`
  margin-left: 8%;
  margin-right: 8%;
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  width: 1080px;
`;

const Explain1 = styled.div`
  margin-right: 53%;
  margin-top: 20px;
  color: #9fa4a9;
`;

const Explain2 = styled.div`
  margin-top: 20px;
  color: #9fa4a9;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: ${({ theme }) => theme.color.grayscale04};
`;
