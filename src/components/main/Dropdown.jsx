import React from "react";
import styled, { css } from "styled-components";
import useDetectClose from "../../hooks/main/useDetectClose";
import downIconImg from "../../assets/main/downIcon.svg";

export default function DropdownMenu({ list, setOption, selectedOption }) {
  const [dropdownOpen, myPageRef, myPageHandler] = useDetectClose(false);

  return (
    <DropdownContainer>
      <Menu isdropped={dropdownOpen}>
        <Ul>
          {list.map((li) => (
            <Li
              key={li}
              value={li}
              onClick={() => setOption(li)}
              selected={selectedOption === li}
            >
              {li}분
            </Li>
          ))}
        </Ul>
      </Menu>
      <DropdownButton
        onClick={myPageHandler}
        ref={myPageRef}
        selected={selectedOption}
      >
        {selectedOption === undefined ? "10" : selectedOption}분
        <img src={downIconImg} style={{ width: "24px", height: "24px" }} />
      </DropdownButton>
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
  border-radius: 50px;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
`;

const DropdownButton = styled.button`
  cursor: pointer;
  width: 155px;
  height: 44px;
  border-radius: 50px;
  text-align: center;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 63px;
  position: relative;
  background: #fff;
  border: none;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  color: ${(props) =>
    props.selected === undefined
      ? "var(--gray-scale-9-fa-4-a-9, #9FA4A9)"
      : "var(--gray-scale-464-c-52, #464C52)"};
  &:focus {
    border: 0.5px solid var(--gray-scale-9-fa-4-a-9, #9fa4a9);
  }
`;

const Menu = styled.div`
  background: #fff;
  position: absolute;
  top: 26px;
  left: 50%;
  width: 154px;
  height: 129px;
  padding-top: 18px;
  padding-bottom: 12px;
  background: #fff;
  box-sizing: border-box;
  text-align: center;
  border-bottom-left-radius: 25px;
  border-bottom-right-radius: 25px;
  opacity: 0;
  visibility: hidden;
  transform: translate(-50%, -20px);
  transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s;
  overflow: scroll;
  scrollbar-width: thin;
  scrollbar-color: #464c52;
  -webkit-scrollbar {
    width: 0px;
    height: 87px;
  }
  -webkit-scrollbar-thumb {
    background-color: #2f3542;
  }
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
  height: 111px;
  & > button {
    padding-top: 7.5px;
    padding-bottom: 7.5px;
  }

  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const Li = styled.button`
  width: 100%;
  color: ${(props) =>
    props.selected
      ? "var(--gray-scale-464-c-52, #464C52)"
      : "var(--gray-scale-9-fa-4-a-9, #9FA4A9)"};
  border: none;
  background: #fff;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
`;
