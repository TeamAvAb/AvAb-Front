import React from 'react';
import styled from 'styled-components';
import RecreationCardS from './RecreationCardS';
import HashtagChip from '../../chip/HashtagChip';

export default function RecreationCardWHashtag({ content, refetch }) {
  return (
    <CardLayout>
      <HashtagChip text={content.hashtagList[0]} />
      <RecreationCardS content={content} refetch={refetch} />
    </CardLayout>
  );
}
const CardLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
`;
