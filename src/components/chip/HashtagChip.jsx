import React from 'react';
import styled from 'styled-components';

export default function HashtagChip({ text }) {
  return <Chip>#{text}</Chip>;
}

const Chip = styled.div`
  width: fit-content;
  height: 3.56rem;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  padding: 0.8em 1.72em;
  border-radius: 3.125rem;
  background-color: ${({ theme }) => theme.color.secondary02};
  color: ${({ theme }) => theme.color.main05};
  ${({ theme }) => theme.text.button}
`;
