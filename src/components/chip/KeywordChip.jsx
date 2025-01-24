import React from 'react';
import styled from 'styled-components';

export default function KeywordChip({ text, onClick, className }) {
  return (
    <Chip className={className} onClick={onClick}>
      {text}
    </Chip>
  );
}

const Chip = styled.div`
  width: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  padding: 0.4rem 1.8rem;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.color.grayscale06};
  color: ${({ theme }) => theme.color.grayscale01};
  ${({ theme }) => theme.text.small};
`;
