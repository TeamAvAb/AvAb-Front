import React from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import useLoginStore from '../../stores/loginStore';
import useLoginModalStore from '../../stores/loginModalStore';
import { scrollToTop } from '../../utils/windowUtils';
import SITE_URL from '../../constants/url';

export default function Navigation() {
  const { isLoggedIn } = useLoginStore((state) => state);
  const { modalControl } = useLoginModalStore((state) => state);

  const navigate = useNavigate();
  const handleClickMyPage = () => {
    if (!isLoggedIn) {
      modalControl();
    } else {
      navigate(SITE_URL.MY_INFO);
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
      <Li onClick={scrollToTop}>
        <Link to={SITE_URL.FLOW}>일정플로우</Link>
      </Li>
      <Li onClick={handleClickMyPage}>마이페이지</Li>
    </Ul>
  );
}

const Ul = styled.ul`
  display: flex;
  justify-content: center;
  padding: 1.5rem 0;
  gap: clamp(1rem, 8vw, 12rem);
`;

const Li = styled.li`
  ${({ theme }) => theme.text.nav};
  font-size: clamp(1.0rem, 1.6vw, 1.6rem);
  white-space: nowrap;
  cursor: pointer;
`;
