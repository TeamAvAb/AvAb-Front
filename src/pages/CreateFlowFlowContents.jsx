import styled from 'styled-components';
import SelectRecreationSection from '../components/createFlow/SelectRecreationSection';
import { FlowContentsSection } from '../components/createFlow/FlowContentsSection';

export function CreateFlowFlowContents({ context, onBack }) {
  const { purposes, totalPlayTime, keywords, genders, ageGroups, participants } = context;

  return (
    <Container>
      <SelectRecreationSection totalPlayTime={totalPlayTime} purposes={purposes} />
      <FlowContentsSection
        flow={{
          purposes,
          totalPlayTime,
          keywords,
          genders,
          ageGroups,
          participants,
        }}
      />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  gap: 1.25rem;
  width: 100%;
`;
