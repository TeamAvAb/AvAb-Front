import React from 'react';
import styled from 'styled-components';
import RecreationPrev from './RecreationPrev';

export default function RecreationTripleSet({ dataset }) {
  return (
    <RecreationSetContainer>
      {dataset && dataset.map((data) => <RecreationPrev key={data.id} content={data} />)}
    </RecreationSetContainer>
  );
}

const RecreationSetContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 2rem;
`;
