import React from 'react';
import styled from 'styled-components';
import FooterContainer from './FooterContainer';
import FooterCopyright from './FooterCopyright';

export default function Footer() {
  return (
    <FooterContainer>
      <FooterCopyright onlyCopyright />
    </FooterContainer>
  );
}

const Content = styled.div`
  color: #9fa4a9;
`;
