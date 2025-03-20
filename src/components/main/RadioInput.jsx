import React from 'react';
import styled, { css } from 'styled-components';
import clsx from 'clsx';

export default function RadioInput({ options, setOption, selectedOption, border, gap = 'md' }) {
  const handleOptionClick = (option) => {
    const isSelected = selectedOption.some((item) => item.key === option.key);
    if (isSelected) {
      setOption(selectedOption.filter((el) => el.key !== option.key));
    } else {
      setOption([...selectedOption, option]);
    }
  };

  return (
    <Options $gap={gap}>
      {options.map((option) => (
        <Option
          key={option.key}
          onClick={() => handleOptionClick(option)}
          className={clsx({
            selected: selectedOption.some((item) => item.key === option.key),
            border,
          })}
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
  background: ${({ theme }) => theme.color.main05};
  text-align: center;
  color: ${({ theme }) => theme.color.grayscale04};
  cursor: pointer;
  width: max-content;

  ${({ $border, theme }) =>
    $border &&
    css`
      border: 1px solid ${theme.color.grayscale05};
    `}
  &.border {
    border: 1px solid ${({ theme }) => theme.color.grayscale05};
  }

  &.selected {
    ${({ theme }) => css`
      background-color: ${theme.color.secondary04};
      color: ${theme.color.grayscale01};
      font-weight: bold;
    `}
  }
`;
