import React, { useContext, useState } from "react";
import styled, { ThemeContext } from "styled-components";
import { ReactComponent as Icon } from "../../assets/Card/scrapIcon.svg";
import { privateAPI } from "../../apis/user";
import useLoginStore from "../../stores/loginStore";
import useLoginModalStore from "../../stores/loginModalStore";

export default function ScrapBtn({ flowId, isScrap }) {
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
          return;
        } else {
          console.log(response.data);
        }
      } catch (error) {
        throw new Error("ScrapBtn Error");
      }
    }
  };
  return (
    <IconWrapper onClick={() => handleClick(flowId)}>
      <Icon fill={isScrapped ? theme.color.main04 : theme.color.grayscale06} />
    </IconWrapper>
  );
}

const IconWrapper = styled.button`
  background: none;
  border: none;
  width: fit-content;
`;
