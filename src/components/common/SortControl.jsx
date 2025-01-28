import React from 'react';
import arrow from '../../assets/searchlist/dropdownArrow.svg';
import styled, { css } from 'styled-components';
import useDetectClose from '../../hooks/main/useDetectClose';

export default function SortControl({ setOption, selectedOption, isFlow }) {
  const [dropdownOpen, containerRef, containerHandler] = useDetectClose(false);
  const recreationOptions = [
    {
      name: '인기순',
      value: 'LIKE',
    },
    {
      name: '조회 많은순',
      value: 'VIEW',
    },
    {
      name: '최신순',
      value: 'RECENT',
    },
  ];

  const flowOptions = [
    {
      name: '인기순',
      value: 'SCRAP',
    },
    {
      name: '조회 많은순',
      value: 'VIEW',
    },
    {
      name: '최신순',
      value: 'RECENT',
    },
  ];
  const optionConverter = (option) => {
    return (isFlow ? flowOptions : recreationOptions).find((el) => el.value === option).name;
  };
  return (
    <DropdownContainer>
      <DropdownButton ref={containerRef} onClick={containerHandler}>
        {optionConverter(selectedOption)}
        <img src={arrow} alt="" />
      </DropdownButton>
      <Menu $open={dropdownOpen}>
        {(isFlow ? flowOptions : recreationOptions).map((option) => (
          <Li
            key={option.value}
            onClick={() => setOption(option.value)}
            selected={selectedOption === option.value}
          >
            {option.name}
          </Li>
        ))}
      </Menu>
    </DropdownContainer>
  );
}

const DropdownContainer = styled.div`
  position: relative;
  text-align: center;
  margin-left: auto;
  z-index: 1;
`;

const DropdownButton = styled.button`
  text-align: center;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  border: none;
  z-index: 2;
  ${({ theme }) => theme.text.paragraph};
  font-weight: 700;
`;

const Menu = styled.ul`
  transform: translateY(-1.2rem);
  right: 0;
  width: 8rem;
  padding: 1rem;
  gap: 1rem;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 2rem;
  background: #fff;
  opacity: 0;
  visibility: hidden;
  transition:
    opacity 0.4s ease,
    transform 0.4s ease,
    visibility 0.4s;

  border-radius: 1.2rem;
  border: 1px solid ${({ theme }) => theme.color.grayscale01};

  ${({ $open }) =>
    $open &&
    css`
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    `};
`;

const Li = styled.li`
  color: ${({ theme, selected }) => (selected ? theme.color.grayscale01 : theme.color.grayscale04)};
  text-align: center;

  ${({ theme }) => theme.text.h5};

  &:hover {
    color: ${({ theme }) => theme.color.grayscale01};
  }

  transition: color 0.4s ease;
`;
