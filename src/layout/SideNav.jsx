import React from 'react';
import styled from 'styled-components';

export default function SideNav({ title, children }) {
  return (
    <SideBar>
      <Title>{title}</Title>
      <MenuList>{children}</MenuList>
    </SideBar>
  );
}
const SideBar = styled.div`
  width: 20rem;
  ${({ theme }) => theme.text.nav}
  background-color: ${({ theme }) => theme.color.main05};
  border-right: solid ${({ theme }) => theme.color.grayscale05} 1px;
`;

const Title = styled.div`
  padding: 2rem 1.5rem;
  border-bottom: solid ${({ theme }) => theme.color.grayscale05} 1px;
`;

const MenuList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
