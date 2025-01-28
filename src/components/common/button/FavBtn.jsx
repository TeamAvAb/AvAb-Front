import React, { useContext, useState } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { ReactComponent as Icon } from '../../../assets/recreation/heartIcon.svg';
import useLoginStore from '../../../stores/loginStore';
import useLoginModalStore from '../../../stores/loginModalStore';
import { privateAPI } from '../../../apis/user';

export default function FavBtn({ recreationId, isFav, className }) {
  const [isFavorite, setIsFavorite] = useState(isFav);
  const { isLoggedIn } = useLoginStore((state) => state);
  const { modalControl } = useLoginModalStore();
  const theme = useContext(ThemeContext);

  const handleClick = async (event) => {
    event.stopPropagation();

    if (!isLoggedIn) {
      modalControl();
      return;
    }

    try {
      const response = await privateAPI.post(`/api/recreations/${recreationId}/favorites`);
      if (response.status === 201) {
        setIsFavorite((prev) => !prev);
      } else {
        console.log(response.data);
      }
    } catch (error) {
      throw new Error('FavBtn Error');
    }
  };
  return (
    <IconWrapper onClick={(event) => handleClick(event)} className={className}>
      <Icon fill={isFavorite ? theme.color.main04 : theme.color.grayscale06} />
    </IconWrapper>
  );
}

const IconWrapper = styled.button`
  background: none;
  border: none;
  width: fit-content;
`;
