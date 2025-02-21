import styled from 'styled-components';
import FavoriteRecreationsSection from './FavoriteRecreationsSection';
import RecreationSearchSection from './RecreationSearchSection';
import RecommendedRecreationSection from './RecommendedRecreationSection';

export default function SelectRecreationSection({ purposes, totalPlayTime, appendRecreation }) {
  return (
    <Container>
      <SectionHeading>레크레이션 선택</SectionHeading>
      <RecommendedRecreationSection
        totalPlayTime={totalPlayTime}
        purposes={purposes}
        appendRecreation={appendRecreation}
      />
      <FavoriteRecreationsSection appendRecreation={appendRecreation} />
      <RecreationSearchSection appendRecreation={appendRecreation} />
    </Container>
  );
}

const Container = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  width: 50%;
`;

const SectionHeading = styled.h2`
  ${({ theme }) => theme.text.h4};
  padding: 1.7rem 2.4rem;
  border: 1px solid ${({ theme }) => theme.color.grayscale05};
  border-radius: 1.25rem;
`;
