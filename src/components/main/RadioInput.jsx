import React from 'react';
import styled from 'styled-components';

export default function RadioInput({ options, setOption, selectedOption }) {
  const handleOptionClick = (option) => {
    const isSelected = selectedOption.includes(option);
    if (isSelected) {
      setOption(selectedOption.filter((el) => el !== option));
    } else {
      setOption((prev) => [...prev, option]);
    }
  };

  return (
    <Options>
      {options.map((option) => (
        <Option
          key={option.key}
          onClick={() => handleOptionClick(option)}
          selected={selectedOption.includes(option)}
        >
          {option.value}
        </Option>
      ))}
    </Options>
  );
}

const Options = styled.ul`
  display: flex;
  flex-direction: row;
  gap: 2.5rem;
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
`;
