import React from 'react';
import styled from 'styled-components';

export default function FooterCopyright({ onlyCopyright = false }) {
  return (
    <Container onlyCopyright={onlyCopyright}>
      <span>COPYRIGHT © Avab all rights reserved</span>
      {!onlyCopyright && <a>Contact Us</a>}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: ${({ onlyCopyright }) => (onlyCopyright ? 'center' : 'space-between')};
  ${({ theme }) => theme.text.small};
  padding: 1rem 0;
  color: ${({ theme }) => theme.color.grayscale04};
  width: 100%;
`;
