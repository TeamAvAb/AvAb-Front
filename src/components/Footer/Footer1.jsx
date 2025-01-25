import React from 'react';
import FooterP from '../../assets/Footer/FooterP.svg';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useLoginStore from '../../stores/loginStore';
import useLoginModalStore from '../../stores/loginModalStore';

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
    <Wrapper>
      <Container>
        <MainSection>
          <OpinionImg src={FooterP}></OpinionImg>
          <OpinionMsgContainer>
            <OpinionMsg>
              <BoldSpan>아브아브</BoldSpan>에게
              <br />
              의견을 보내주세요
            </OpinionMsg>
            <ContactButton onClick={ToInstagram}>의견 보내러 가기</ContactButton>
          </OpinionMsgContainer>
        </MainSection>
        <FooterNav>
          <Ul>
            <Li onClick={ToMainpage}>마이페이지</Li>
            <Li onClick={ToRecreation}>레크레이션</Li>
            <Li onClick={ToFlowWrite}>일정플로우</Li>
            <Li onClick={ToMypage}>마이페이지</Li>
          </Ul>
        </FooterNav>
        <Bottom>
          <Explain1>COPYRIGHT © Avab all rights reserved</Explain1>
          <Explain2>Contact Us</Explain2>
        </Bottom>
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.footer`
  margin-top: 6rem;
  background: #ebe9ed;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;

const MainSection = styled.section`
  display: flex;
  justify-content: end;
  width: 67.5rem;
  position: relative;
  margin-bottom: 2rem;
`;

const OpinionImg = styled.img`
  position: absolute;
  width: 26rem;
  left: 0;
  top: -8rem;
`;

const OpinionMsgContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  gap: 1.5rem;
  padding: 2rem 0;
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

const ContactButton = styled.button`
  display: flex;
  justify-content: center;
  padding: 1rem 2.5rem;
  background-color: #081882;
  color: white;
  border: none;
  border-radius: 9999px;
  cursor: pointer;
  font-size: 1.2rem;
  font-weight: 600;
`;

const FooterNav = styled.div`
  display: flex;
  justify-content: center;
  width: 67.5rem;
  border-bottom: 2px solid #9fa4a9;
  padding: 1.5rem 0;
  font-size: 1.5rem;
`;

const Ul = styled.ul`
  display: flex;
  justify-content: space-between;
`;

const Li = styled.li`
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
