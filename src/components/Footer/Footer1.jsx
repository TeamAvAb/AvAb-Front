import React from 'react';
import FooterP from '../../assets/Footer/FooterP.svg'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export default function Footer() {
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
    navigate(`/mypage`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const ToInstagram = () => {
    window.location.href = 'https://www.instagram.com/avab.ovo/';
  };
  return (
    <FooterWrap>
      <FooterHigh>
        <High1>
          <NoneImg src={FooterP}></NoneImg>
        </High1>
        <High2>
          <Section1>아브아브</Section1>
          <Section2>에게<br/>의견을 보내주세요</Section2>
          <ContactBut onClick={ToInstagram}>의견 보내러 가기</ContactBut>
        </High2>
      </FooterHigh>
      <Middle>
        <DetailsWrap>
          <Details onClick={ToMainpage}>메인페이지</Details>
          <Details onClick={ToRecreation}>레크레이션</Details>
          <Details onClick={ToFlowWrite}>일정플로우</Details>
          <Details onClick={ToMypage}>마이페이지</Details>
        </DetailsWrap>
      </Middle>
      <Bottom>
        <Explain1>COPYRIGHT © Avab all rights reserved</Explain1>
        <Explain2>Contact Us</Explain2>
      </Bottom>
    </FooterWrap>
  )
}

const FooterWrap = styled.footer`
  position: relative;
  height: 577px;
  background-image: linear-gradient(to bottom, white 104px, #e9ebed 104px, #e9ebed 577px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FooterHigh = styled.div`
  display: flex;
  justify-content: center;
  height: 425px;
`;

const High1 = styled.div`
  margin-right: 230px;
`;

const NoneImg = styled.img`
  width: 421px;
  height: 421px;
`;

const High2 = styled.div`
  margin-top: 154px;
  height: 114px;
  width: 344px;
`;

const Section1 = styled.span`
  font-size: 40px;
  font-weight: 600;
  margin-left: 80px;
`;

const Section2 = styled.span`
  font-size: 40px;
`;


const ContactBut = styled.div`
  display: flex;
  justify-content: center;
  padding: 15px 10px;
  width: 179px;
  margin-top: 40px;
  margin-left: 90px;
  background-color: #081882;
  color: white;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  font-size: 18px;
  font-weight: 600;
`;

const Middle = styled.div`
  display: flex;
  justify-content: center;
  width: 1080px;
  border-bottom: 2px solid #9fa4a9;
`;

const DetailsWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1030px;
  height: 67px;
`;

const Details = styled.div`
  margin-left: 80px;
  margin-right: 80px;
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  width: 1080px;
  margin-bottom: 40px;
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