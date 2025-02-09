import React from 'react';
import FooterContainer from './FooterContainer';
import FooterCopyright from './FooterCopyright';

export default function Footer3() {
  return (
    <FooterContainer>
      <FooterCopyright onlyCopyright />
    </FooterContainer>
  );
}
