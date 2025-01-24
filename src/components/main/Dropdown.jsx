import React from 'react';
import styled, { css } from 'styled-components';
import useDetectClose from '../../hooks/main/useDetectClose';
import downIconImg from '../../assets/main/downIcon.svg';

export default function DropdownMenu({ list, setOption, selectedOption }) {
  const [dropdownOpen, myPageRef, myPageHandler] = useDetectClose(false);
  const handleClickLi = (li) => {
    if (selectedOption === li) {
      setOption([]);
    } else {
      setOption(li);
    }
  };
  return (
    <DropdownContainer>
      <Menu $isdropped={dropdownOpen}>
        <Ul>
          {list.map((li) => (
            <Li
              key={li}
              value={li}
              onClick={() => handleClickLi(li)}
              selected={selectedOption === li}
            >
              {li}분
            </Li>
          ))}
        </Ul>
      </Menu>
      <DropdownButton onClick={myPageHandler} ref={myPageRef} selected={selectedOption}>
        {selectedOption.length === 0 ? '10' : selectedOption}
        분
        <img src={downIconImg} style={{ width: '1.2rem' }} alt="" />
      </DropdownButton>
    </DropdownContainer>
  );
}

const DropdownContainer = styled.div`
  width: 10rem;
  height: 3rem;
  background: ${({ theme }) => theme.color.main05};
  position: relative;
  text-align: center;
  color: ${({ theme }) => theme.color.grayscale04};
  border-radius: 9999px;
  font-size: 1rem;
`;

const DropdownButton = styled.button`
  cursor: pointer;
  width: 10rem;
  height: 3rem;
  border-radius: 9999px;
  text-align: center;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  position: relative;
  background: #fff;
  font-size: 1rem;
  color: ${({ selected, theme }) =>
    selected.length === 0 ? theme.color.grayscale04 : theme.color.grayscale03};

  &:focus {
    border: 1px solid ${({ theme }) => theme.color.grayscale04};
  }
`;

const Menu = styled.div`
  background: #fff;
  position: absolute;
  top: 1.5rem;
  padding-top: 1.5rem;
  left: 50%;
  width: 100%;
  max-height: 8rem;

  box-sizing: border-box;
  text-align: center;
  border-bottom-left-radius: 1.5rem;
  border-bottom-right-radius: 1.5rem;
  opacity: 0;
  visibility: hidden;
  transform: translate(-50%, -1.2rem);
  transition:
    opacity 0.4s ease,
    transform 0.4s ease,
    visibility 0.4s;
  overflow: auto;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }

  ${({ $isdropped }) =>
    $isdropped &&
    css`
      opacity: 1;
      visibility: visible;
      transform: translate(-50%, 0);
      left: 50%;
    `};
`;

const Ul = styled.ul`
  height: 8rem;

  & > button {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
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
  color: ${({ selected, theme }) => (selected ? theme.color.grayscale03 : theme.color.grayscale04)};
  border: none;
  background: #fff;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  cursor: pointer;
`;
