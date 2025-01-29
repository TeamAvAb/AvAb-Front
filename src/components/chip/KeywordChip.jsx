import React from 'react';
import styled from 'styled-components';

export default function KeywordChip({ text, onClick, className, width = '33%' }) {
  return (
    <Chip className={className} onClick={onClick} width={width}>
      {text}
    </Chip>
  );
}

const Chip = styled.div`
  width: ${({ width }) => width};
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  padding: 0.4rem;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.color.grayscale06};
  color: ${({ theme }) => theme.color.grayscale01};
  ${({ theme }) => theme.text.small};
`;
