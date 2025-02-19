import styled from 'styled-components';
import SelectRecreationSection from '../components/createFlow/SelectRecreationSection';
import { FlowContentsSection } from '../components/createFlow/FlowContentsSection';
import StepControl from '../components/createFlow/StepControl';

export function CreateFlowFlowContents({ context, onBack }) {
  const { purposes, totalPlayTime, keywords, genders, ageGroups, participants } = context;

  return (
    <Container>
      <Sections>
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
      </Sections>
      <StepControl last />
    </Container>
  );
}

const Sections = styled.div`
  display: flex;
  gap: 1.25rem;
  width: 100%;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 4rem;
`;
