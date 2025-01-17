import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import useLoginStore from '../../stores/loginStore';
import useLoginModalStore from '../../stores/loginModalStore';

export default function FooterNav() {
  const { isLoggedIn } = useLoginStore((state) => state);
  const { modalControl } = useLoginModalStore((state) => state);

  const navigate = useNavigate();
  const goToMain = () => {
    navigate(`/`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const goToRecreation = () => {
    navigate(`/search/list`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const goToFlow = () => {
    navigate(`/flow/watch`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const goToMyPage = () => {
    if (isLoggedIn) {
      navigate(`/mypage/myinfo`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      modalControl();
    }
  };

  return (
    <Container>
      <Ul>
        <Li onClick={goToMain}>메인페이지</Li>
        <Li onClick={goToRecreation}>레크레이션</Li>
        <Li onClick={goToFlow}>일정플로우</Li>
        <Li onClick={goToMyPage}>마이페이지</Li>
      </Ul>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 1.5rem 0;
  font-size: 1.5rem;
  width: 100%;
`;

const Ul = styled.ul`
  display: flex;
`;

const Li = styled.li`
  ${({ theme }) => theme.text.nav};
  margin: 0 5rem;
  cursor: pointer;
`;
