import React from 'react';
import { PacmanLoader } from 'react-spinners';
import styled from 'styled-components';

export default function LoadingSpinner({ height = 'full' }) {
  return (
    <Loading $height={height}>
      <PacmanLoader />
      <span>잠시만 기다려주세요...</span>
    </Loading>
  );
}

const height = {
  full: '100%',
  lg: '60vh',
};

const Loading = styled.div`
  width: 100%;
  height: ${({ $height }) => height[$height]};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 40px;
  text-align: center;
  ${({ theme }) => theme.text.paragraph}
`;
