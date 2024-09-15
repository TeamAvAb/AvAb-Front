import React from "react";
import useDetectClose from "../hooks/main/useDetectClose";
import arrow from "../assets/searchlist/dropdownArrow.svg";
import styled, { css } from "styled-components";
export default function SortControl({
  setOption,
  selectedOption,
  marginright,
  isFlow,
}) {
  const [dropdownOpen, containerRef, containerHandler] = useDetectClose(false);
  const optionConverter = (option) => {
    if (option === "LIKE" || option === "SCRAP") return "인기순";
    else if (option === "VIEW") return "조회 많은순";
    else if (option === "RECENT") return "최신순";
  };
  return (
    <DropdownContainer marginright={marginright}>
      <Menu isdropped={dropdownOpen}>
        <Ul>
          <Li onClick={() => setOption(isFlow ? "SCRAP" : "LIKE")}>인기순</Li>
          <Li onClick={() => setOption("VIEW")}>조회 많은순</Li>
          <Li onClick={() => setOption("RECENT")}>최신순</Li>
        </Ul>
      </Menu>
      <DropdownButton ref={containerRef} onClick={containerHandler}>
        {optionConverter(selectedOption)}
        <img src={arrow} />
      </DropdownButton>
    </DropdownContainer>
  );
}

const DropdownContainer = styled.div`
  position: relative;
  text-align: center;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  margin-left: auto;
  margin-right: ${(props) => (props.marginright ? props.marginright : "43px")};
  z-index: 1;
`;

const DropdownButton = styled.button`
  cursor: pointer;
  width: 142px;
  border-radius: 50px;
  text-align: center;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
  position: relative;
  background: #fff;
  border: none;

  color: #000000;

  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const Menu = styled.div`
  position: absolute;
  top: 36px;
  left: 50%;
  width: 142px;
  flex-shrink: 0;
  padding: 20px 0;
  background: #fff;
  box-sizing: border-box;
  text-align: center;
  opacity: 0;
  visibility: hidden;
  transform: translate(-50%, -20px);
  transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s;
  overflow: hidden;

  border-radius: 20px;
  border: 0.7px solid var(--gray-scale-1-b-1-d-1-f, #1b1d1f);
  background: var(--main-ffffff, #fff);

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
  border-bottom-left-radius: 25px;
  border-bottom-right-radius: 25px;
`;

const Li = styled.button`
  width: 100%;
  color: #9fa4a9;
  border: none;
  background: #fff;

  text-align: center;

  font-size: 20px;
  font-style: normal;
  font-weight: ${(props) => (props.selected ? 700 : 500)};
  line-height: normal;

  &:hover {
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 24px;

    color: #1b1d1f;
  }
`;
