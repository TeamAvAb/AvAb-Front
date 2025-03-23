import styled from 'styled-components';
import FlowRecreationList from '../common/FlowRecreationList';

export default function FlowTimelineSection({ flowTitle, recreations }) {
  return (
    <FlowContainer>
      <h2>{flowTitle}</h2>
      <FlowRecreationList recreations={recreations} />
    </FlowContainer>
  );
}

const FlowContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem 10rem;
  border-radius: 1.25rem;
  border: 1px solid ${({ theme }) => theme.color.grayscale05};
  background: white;
  gap: 3.8rem;

  h2 {
    ${({ theme }) => theme.text.h4};
  }
`;
