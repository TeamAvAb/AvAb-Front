import React, { useState } from "react";
import styled, { css } from "styled-components";
import useDetectClose from "../../hooks/main/useDetectClose";
import downIconImg from "../../assets/main/downIcon.svg";

export default function DropdownMenu({ list }) {
  const [myPageIsOpen, myPageRef, myPageHandler] = useDetectClose(false);

  const [selected, setSelected] = useState(list[0]);
  return (
    <DropdownContainer isOpen={myPageIsOpen}>
      <DropdownButton
        isOpen={myPageIsOpen}
        onClick={myPageHandler}
        ref={myPageRef}
      >
        {selected}분
        <img src={downIconImg} style={{ width: "24px", height: "24px" }} />
      </DropdownButton>
      <Menu isdropped={myPageIsOpen}>
        <Ul>
          {list.map((li) => (
            <Li key={li} value={li} onClick={() => setSelected(li)}>
              {li}분
            </Li>
          ))}
        </Ul>
      </Menu>
    </DropdownContainer>
  );
}

const DropdownContainer = styled.div`
  width: 155px;
  height: 44px;
  background: #fff;
  position: relative;
  text-align: center;
  color: var(--gray-scale-9-fa-4-a-9, #9fa4a9);
  border-radius: ${(props) => (props.myPageIsOpen ? "0" : "50px")};
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
`;

const DropdownButton = styled.div`
  cursor: pointer;
  width: 155px;
  height: 44px;
  border-radius: ${(props) => (props.myPageIsOpen ? "0" : "50px")};
  text-align: center;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 63px;
`;
const Menu = styled.div`
  background: #fff;
  position: absolute;
  top: 44px;
  left: 50%;
  width: 100%;
  text-align: center;
  /* box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2); */
  border-bottom-left-radius: 25px;
  border-bottom-right-radius: 25px;
  opacity: 0;
  visibility: hidden;
  transform: translate(-50%, -20px);
  transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s;
  z-index: 9;

  ${({ isdropped }) =>
    isdropped &&
    css`
      opacity: 1;
      visibility: visible;
      transform: translate(-50%, 0);
      left: 50%;
    `};
`;

const Ul = styled.ul`
  & > li {
    padding-top: 5px;
    padding-bottom: 5px;
  }

  & > li:first-of-type {
    margin-top: 10px;
  }

  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const Li = styled.li`
  color: var(--gray-scale-9-fa-4-a-9, #9fa4a9);

  width: 100%;
`;
