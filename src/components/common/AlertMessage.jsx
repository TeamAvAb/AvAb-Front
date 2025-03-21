import { ReactComponent as AlertImg } from '../../assets/common/alert.svg';
import React from 'react';
import styled from 'styled-components';
import theme from '../../styles/theme';

export default function AlertMessage({ message }) {
  return (
    <Alert>
      <AlertImg alt="경고" fill={theme.color.main04} />
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
