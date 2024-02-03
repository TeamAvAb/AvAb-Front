import React, { useState, useEffect } from "react";
import styled from "styled-components";

export default function RadioInput({ content, setOption, selectedOption }) {
  const handleSelect = (id) => {
    const isSelected = selectedOption.includes(id);
    if (isSelected) {
      setOption(selectedOption.filter((el) => el !== id));
    } else {
      setOption((prev) => [...prev, id]);
    }
  };

  return (
    <Options>
      {content.map((el) => (
        <Option
          key={el.id}
          onClick={() => handleSelect(el.id)}
          selected={selectedOption.includes(el.id)}
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
  gap: 30px;
`;
const Option = styled.button`
  width: max-content;
  height: 43px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 50px;
  box-sizing: border-box;
  padding: 12px 30px;
  background: ${(props) =>
    props.selected ? "var(--main-scale-b-1-beff, #B1BEFF)" : "#FFF"};
  text-align: center;
  color: ${(props) =>
    props.selected
      ? "var(--gray-scale-1-b-1-d-1-f, #1B1D1F)"
      : "var(--gray-scale-9-fa-4-a-9, #9fa4a9)"};
  font-size: 16px;
  font-style: normal;
  font-weight: ${(props) => (props.selected ? "600" : "400")};
`;
