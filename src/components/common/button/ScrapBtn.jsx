import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { ReactComponent as Icon } from '../../../assets/card/scrapIcon.svg';

export default function ScrapBtn({ isScrap, onClick, className }) {
  const theme = useContext(ThemeContext);

  return (
    <IconWrapper onClick={onClick} className={className}>
      <Icon fill={isScrap ? theme.color.main04 : theme.color.grayscale06} />
    </IconWrapper>
  );
}

const IconWrapper = styled.button`
  background: none;
  border: none;
`;
