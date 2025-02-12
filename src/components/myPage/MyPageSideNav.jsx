import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import LogoutModal from '../modal/LogoutModal';
import { scrollToTop } from '../../utils/windowUtils';
import SideNav from '../../layout/SideNav';

export default function MyPageSideNav({ selectedPage }) {
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  const navigate = useNavigate();

  const handleMyInfoClick = () => {
    navigate(`/mypage/myinfo`);
    scrollToTop();
  };

  const handleFavoritesClick = () => {
    navigate(`/mypage/favorites`);
    scrollToTop();
  };

  const handleLogoutClick = () => {
    setLogoutModalOpen(true);
  };

  return (
    <SideNav title="마이페이지">
      <MenuItem $selected={selectedPage === 'info'} onClick={handleMyInfoClick}>
        내 정보
      </MenuItem>
      <MenuItem $selected={selectedPage === 'favorites'} onClick={handleFavoritesClick}>
        즐겨 찾는 레크레이션
      </MenuItem>
      <MenuItem $selected={false} onClick={handleLogoutClick}>
        로그아웃
      </MenuItem>
      {logoutModalOpen && <LogoutModal handleModal={setLogoutModalOpen}></LogoutModal>}
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
