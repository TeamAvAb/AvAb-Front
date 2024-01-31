import React from 'react';
import styled from 'styled-components';

export default function Footer() {
  return (
    <FooterWrap>
      <Content>
        COPYRIGHT © Avab all rights reserved
      </Content>
    </FooterWrap>
  )
}

const FooterWrap = styled.footer`
  position: relative;
  width: 1536px;
  height: 83px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e9ebed;
`;

const Content = styled.div`
  color: #9fa4a9;
`;