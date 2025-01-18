import React from 'react';
import styled from 'styled-components';

export default function PurposeChip({ text }) {
  return <Chip>{text}</Chip>;
}

const Chip = styled.div`
  width: fit-content;
  height: 3.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  padding: 0.8em 1.69em;
  border-radius: 3.125rem;
  background-color: ${({ theme }) => theme.color.main03};
  color: ${({ theme }) => theme.color.grayscale01};
  ${({ theme }) => theme.text.button}
`;
