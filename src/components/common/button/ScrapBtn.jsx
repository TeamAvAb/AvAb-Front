import React, { useContext, useState } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { ReactComponent as Icon } from '../../../assets/Card/scrapIcon.svg';
import useLoginStore from '../../../stores/loginStore';
import useLoginModalStore from '../../../stores/loginModalStore';
import { privateAPI } from '../../../apis/user';

export default function ScrapBtn({ flowId, isScrap, className }) {
  const [isScrapped, setIsScrapped] = useState(isScrap);
  const { isLoggedIn } = useLoginStore((state) => state);
  const { modalControl } = useLoginModalStore();
  const theme = useContext(ThemeContext);

  const handleClick = async () => {
    if (!isLoggedIn) {
      modalControl();
      return;
    } else {
      try {
        const response = await privateAPI.post(`/api/flows/${flowId}/scraps`);
        if (response.status === 200) {
          setIsScrapped((prev) => !prev);
        } else {
          console.log(response.data);
        }
      } catch (error) {
        throw new Error('ScrapBtn Error');
      }
    }
  };
  return (
    <IconWrapper onClick={() => handleClick(flowId)} className={className}>
      <Icon fill={isScrapped ? theme.color.main04 : theme.color.grayscale06} />
    </IconWrapper>
  );
}

const IconWrapper = styled.button`
  background: none;
  border: none;
  width: fit-content;
`;
