import React from 'react';
import styled from 'styled-components';
import CarouselRecreationCard from './CarouselRecreationCard';

export default function RecreationTripleSet({ dataset }) {
  return (
    <RecreationSetContainer>
      {dataset && dataset.map((data) => <CarouselRecreationCard key={data.id} content={data} />)}
    </RecreationSetContainer>
  );
}

const RecreationSetContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 2rem;
`;
