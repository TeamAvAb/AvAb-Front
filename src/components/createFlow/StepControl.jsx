import Button from '../common/button/Button';
import React from 'react';
import styled from 'styled-components';

export default function StepControl({ onNext, onBack, last = false, first = false }) {
  return (
    <Container>
      <Button onClick={onBack} border borderColor="grayscale03" color="grayscale03">
        {first ? '페이지 나가기' : '이전으로'}
      </Button>
      <Button onClick={onNext} backgroundColor="main02" color="main05">
        {last ? '저장하기' : '다음으로'}
      </Button>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  gap: 4rem;
  justify-content: center;
`;
