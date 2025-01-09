import React from 'react';
import styled from 'styled-components';
import RecreationCardS from '../card/recreationCard/RecreationCardS';

export default function RecreationTripleSet({ dataset }) {
  return (
    <RecreationSetContainer>
      {dataset && dataset.map((data) => <RecreationCardS key={data.id} content={data} />)}
    </RecreationSetContainer>
  );
}

const RecreationSetContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 22px;
`;
