import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { ReactComponent as Icon } from '../../assets/recreation/heartIcon.svg';

export default function FavBtn({ isFav, onClick }) {
  const theme = useContext(ThemeContext);

  return (
    <IconWrapper onClick={onClick}>
      <Icon fill={isFav ? theme.color.main04 : theme.color.grayscale06} />
    </IconWrapper>
  );
}

const IconWrapper = styled.button`
  background: none;
  border: none;
  width: fit-content;
`;
