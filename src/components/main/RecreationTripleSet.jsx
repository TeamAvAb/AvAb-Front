import React from 'react';
import styled from 'styled-components';
import RecreationCardWHashtag from '../common/card/recreationCard/RecreationCardWHashtag';

export default function RecreationTripleSet({ dataset }) {
  return (
    <RecreationSetContainer>
      {dataset && dataset.map((data) => <RecreationCardWHashtag key={data.id} content={data} />)}
    </RecreationSetContainer>
  );
}

const RecreationSetContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 2rem;
`;
