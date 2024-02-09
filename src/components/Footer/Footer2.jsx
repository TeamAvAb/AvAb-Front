import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export default function Footer() {
  const navigate = useNavigate();
  const ToMainpage = () => {
    navigate(`/`);
  };
  const ToRecreation = () => {
    navigate(`/search/list`);
  };
  const ToFlowWrite = () => {
    navigate(`/flow/watch`);
  };
  const ToMypage = () => {
    navigate(`/mypage`);
  };
  return (
    <FooterWrap>
      <High>
        <DetailsWrap>
          <Details onClick={ToMainpage}>메인페이지</Details>
          <Details onClick={ToRecreation}>레크레이션</Details>
          <Details onClick={ToFlowWrite}>일정플로우</Details>
          <Details onClick={ToMypage}>마이페이지</Details>
        </DetailsWrap>
      </High>
      <Bottom>
        <Explain1>COPYRIGHT © Avab all rights reserved</Explain1>
        <Explain2>Contact Us</Explain2>
      </Bottom>
    </FooterWrap>
  )
}

const FooterWrap = styled.footer`
  position: relative;
  height: 208px;
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
  border-bottom: 2px solid #9fa4a9;;
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
`

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  width: 1080px;
`

const Explain1 = styled.div` 
  margin-right: 53%;
  margin-top: 20px;
  color: #9fa4a9;
`;

const Explain2 = styled.div` 
  margin-top: 20px;
  color: #9fa4a9;
`;