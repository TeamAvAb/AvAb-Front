import React from 'react';
import styled from 'styled-components';
import FooterNav from './FooterNav';
import FooterCopyright from './FooterCopyright';
import FooterContainer from './FooterContainer';

export default function Footer2() {
  return (
    <FooterContainer>
      <FooterNav />
      <Divider />
      <FooterCopyright />
    </FooterContainer>
  );
}

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: ${({ theme }) => theme.color.grayscale04};
`;
