import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import useLoginStore from '../../stores/loginStore';
import useLoginModalStore from '../../stores/loginModalStore';
import { scrollToTop } from '../../utils/windowUtils';
import SITE_URL from '../../constants/url';

export default function Navigation() {
  const { isLoggedIn } = useLoginStore((state) => state);
  const { modalControl } = useLoginModalStore((state) => state);

  const handleClickMyPage = () => {
    if (!isLoggedIn) {
      modalControl();
    } else {
      scrollToTop();
    }
  };

  return (
    <Ul>
      <Li onClick={scrollToTop}>
        <Link to={SITE_URL.MAIN}>메인페이지</Link>
      </Li>
      <Li onClick={scrollToTop}>
        <Link to={SITE_URL.RECREATION_SEARCH_LIST}>레크레이션</Link>
      </Li>
      <>
        <Li onClick={scrollToTop}>
          <Link to={SITE_URL.FLOW}>일정플로우</Link>
        </Li>
      </>
      <Li onClick={handleClickMyPage}>
        <Link to={isLoggedIn ? SITE_URL.MY_INFO : ''}>마이페이지</Link>
      </Li>
    </Ul>
  );
}

const Ul = styled.ul`
  display: flex;
  justify-content: center;
  padding: 1.5rem 0;
  font-size: 1.5rem;
  gap: 8rem;
`;

const Li = styled.li`
  ${({ theme }) => theme.text.nav};
`;
