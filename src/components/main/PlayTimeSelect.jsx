import React from 'react';
import styled, { css } from 'styled-components';
import useDetectClose from '../../hooks/main/useDetectClose';
import downIconImg from '../../assets/main/downIcon.svg';

export default function PlayTimeSelect({ options, setOption, selectedOption }) {
  const [dropdownOpen, myPageRef, myPageHandler] = useDetectClose(false);
  const handleOptionClick = (option) => {
    if (selectedOption === option) {
      setOption(null);
    } else {
      setOption(option);
    }
  };
  return (
    <DropdownContainer>
      <Menu $open={dropdownOpen}>
        <Ul>
          {options.map((opt) => (
            <Li
              key={opt}
              value={opt}
              onClick={() => handleOptionClick(opt)}
              selected={selectedOption === opt}
            >
              {opt}분
            </Li>
          ))}
        </Ul>
      </Menu>
      <DropdownButton
        onClick={myPageHandler}
        ref={myPageRef}
        $selected={!!selectedOption}
        type="button"
      >
        {selectedOption ? `${selectedOption}분` : '선택하세요.'}
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
  color: ${({ $selected, theme }) =>
    $selected ? theme.color.grayscale01 : theme.color.grayscale04};
  ${({ theme }) => theme.text.small};
  z-index: 5;
  background: ${({ theme }) => theme.color.main05};

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

  ${({ $open }) =>
    $open &&
    css`
      opacity: 1;
      visibility: visible;
      transform: translate(-50%, 0);
      left: 50%;
    `};
`;

const Ul = styled.ul`
  height: 8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Li = styled.li`
  width: 100%;
  color: ${({ selected, theme }) => (selected ? theme.color.grayscale03 : theme.color.grayscale04)};
  border: none;
  background: #fff;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  cursor: pointer;
  padding: 0.5rem 0;
`;
