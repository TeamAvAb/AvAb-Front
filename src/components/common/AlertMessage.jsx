import alertImg from '../../assets/main/alert.svg';
import React from 'react';
import styled from 'styled-components';

export default function AlertMessage({ message }) {
  return (
    <Alert>
      <img src={alertImg} alt="경고" />
      <span>{message}</span>
    </Alert>
  );
}

const Alert = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  color: ${({ theme }) => theme.color.main04};
  ${({ theme }) => theme.text.small};
`;
