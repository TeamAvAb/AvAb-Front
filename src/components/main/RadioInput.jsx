import React from 'react';
import styled from 'styled-components';

export default function RadioInput({ content, setOption, selectedOption }) {
  const handleSelect = (param) => {
    const isSelected = selectedOption.includes(param);
    if (isSelected) {
      setOption(selectedOption.filter((el) => el !== param));
    } else {
      setOption((prev) => [...prev, param]);
    }
  };

  return (
    <Options>
      {content.map((el) => (
        <Option
          key={el.id}
          onClick={() => handleSelect(el.param)}
          selected={selectedOption.includes(el.param)}
        >
          {el.value}
        </Option>
      ))}
    </Options>
  );
}

const Options = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2.5rem;
`;

const Option = styled.button`
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
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
`;
