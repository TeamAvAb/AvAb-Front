import Button from '../common/button/Button';
import React from 'react';
import styled from 'styled-components';

export default function StepControl({ onNext, onBack }) {
  return (
    <Container>
      <Button onClick={onBack} border>
        이전으로
      </Button>
      <Button onClick={onNext} backgroundColor="main02" color="main05">
        다음으로
      </Button>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  gap: 4rem;
  justify-content: center;
`;
