import React from 'react';
import styled, { css } from 'styled-components';

export default function RadioInput({ options, setOption, selectedOption, border, gap = 'md' }) {
  const handleOptionClick = (option) => {
    const isSelected = selectedOption.includes(option);
    if (isSelected) {
      setOption(selectedOption.filter((el) => el !== option));
    } else {
      setOption((prev) => [...prev, option]);
    }
  };

  return (
    <Options $gap={gap}>
      {options.map((option) => (
        <Option
          key={option.key}
          onClick={() => handleOptionClick(option)}
          selected={selectedOption.includes(option)}
          $border={border}
        >
          {option.value}
        </Option>
      ))}
    </Options>
  );
}

const optionGap = {
  md: '2.5rem',
  sm: '1.25rem',
};

const Options = styled.ul`
  display: flex;
  flex-direction: row;
  gap: ${({ $gap }) => optionGap[$gap]};
`;

const Option = styled.li`
  height: 2.8rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 9999px;
  box-sizing: border-box;
  padding: 0.8rem 1.8rem;
  background: ${({ selected, theme }) => (selected ? theme.color.secondary04 : theme.color.main05)};
  text-align: center;
  color: ${({ selected, theme }) => (selected ? theme.color.grayscale01 : theme.color.grayscale04)};
  cursor: pointer;
  width: max-content;
  ${({ $border, theme }) =>
    $border &&
    css`
      border: 1px solid ${theme.color.grayscale05};
    `}
`;
