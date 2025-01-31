import React from 'react';
import FooterP from '../../../assets/Footer/FooterP.svg';
import styled from 'styled-components';
import Button from '../button/Button';
import FooterCopyright from './FooterCopyright';
import FooterContainer from './FooterContainer';
import Navigation from '../Navigation';

export default function Footer1() {
  return (
    <div style={{ marginTop: '8rem' }}>
      <FooterContainer>
        <MainSection>
          <OpinionImg src={FooterP}></OpinionImg>
          <OpinionMsgContainer>
            <OpinionMsg>
              <BoldSpan>아브아브</BoldSpan>에게
              <br />
              의견을 보내주세요
            </OpinionMsg>
            <a href="https://www.instagram.com/avab.ovo/" target="_blank" rel="noreferrer">
              <Button backgroundColor="main01" color="main05">
                의견 보내러 가기
              </Button>
            </a>
          </OpinionMsgContainer>
        </MainSection>
        <Navigation />
        <Divider />
        <FooterCopyright />
      </FooterContainer>
    </div>
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
