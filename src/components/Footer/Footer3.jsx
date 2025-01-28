import React from 'react';
import FooterContainer from './FooterContainer';
import FooterCopyright from './FooterCopyright';

export default function Footer() {
  return (
    <FooterContainer>
      <FooterCopyright onlyCopyright />
    </FooterContainer>
  );
}
