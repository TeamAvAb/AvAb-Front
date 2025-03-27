import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import Icon from '@/assets/card/heartIcon.svg?react';

export default function FavBtn({ isFav, onClick, className }) {
  const theme = useContext(ThemeContext);

  return (
    <IconWrapper onClick={onClick} className={className}>
      <Icon fill={isFav ? theme.color.main04 : theme.color.grayscale06} />
    </IconWrapper>
  );
}

const IconWrapper = styled.button`
  background: none;
  border: none;
  width: fit-content;
`;
