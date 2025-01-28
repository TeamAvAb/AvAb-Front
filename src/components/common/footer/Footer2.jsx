import React from 'react';
import styled from 'styled-components';
import FooterCopyright from './FooterCopyright';
import FooterContainer from './FooterContainer';
import Navigation from '../Navigation';

export default function Footer2() {
  return (
    <FooterContainer>
      <Navigation />
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
