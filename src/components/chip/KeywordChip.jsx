import React from 'react';
import styled from 'styled-components';

export default function KeywordChip({ text }) {
  return <Chip>{text}</Chip>;
}

const Chip = styled.div`
  width: fit-content;
  height: 1.81rem;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  padding: 0.31em 1.81em;
  border-radius: 0.3125rem;
  background-color: ${({ theme }) => theme.color.grayscale06};
  color: ${({ theme }) => theme.color.grayscale01};
  ${({ theme }) => theme.text.small}
`;
