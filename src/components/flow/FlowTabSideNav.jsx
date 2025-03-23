import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import useLoginStore from '../../stores/loginStore';
import useLoginModalStore from '../../stores/loginModalStore';
import { scrollToTop } from '../../utils/windowUtils';
import SideNav from '../../layout/SideNav';
import SITE_URL from '../../constants/url';

export default function FlowTabSideNav({ selectedPage }) {
  const { isLoggedIn } = useLoginStore((state) => state);
  const { modalControl } = useLoginModalStore();

  const navigate = useNavigate();

  const handleWatchFlowClick = () => {
    navigate(SITE_URL.FLOW);
    scrollToTop();
  };

  const handleMyFlowClick = () => {
    if (isLoggedIn) {
      navigate(SITE_URL.MY_FLOW);
      scrollToTop();
    } else {
      modalControl();
    }
  };

  const handleScrapFlowClick = () => {
    if (isLoggedIn) {
      navigate(SITE_URL.MY_SCRAP_FLOW);
      scrollToTop();
    } else {
      modalControl();
    }
  };

  return (
    <SideNav title="일정플로우">
      <MenuItem $selected={selectedPage === 'watch-flow'} onClick={handleWatchFlowClick}>
        플로우 구경하기
      </MenuItem>
      <MenuItem $selected={selectedPage === 'my-flow'} onClick={handleMyFlowClick}>
        내가 만든 일정플로우
      </MenuItem>
      <MenuItem $selected={selectedPage === 'scrap-flow'} onClick={handleScrapFlowClick}>
        스크랩 일정 플로우
      </MenuItem>
    </SideNav>
  );
}

const MenuItem = styled.li`
  width: 100%;
  text-align: center;
  padding: 20px;
  border-bottom: solid ${({ theme }) => theme.color.grayscale05} 1px;
  ${({ theme }) => theme.text.nav};
  font-weight: ${({ $selected }) => ($selected ? 700 : 400)};
  background-color: ${({ $selected, theme }) =>
    $selected ? theme.color.secondary04 : 'transparent'};
  cursor: pointer;
`;
