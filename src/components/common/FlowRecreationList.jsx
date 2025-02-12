import FlowRecreation from '../recreation/FlowRecreation';
import styled from 'styled-components';

export default function FlowRecreationList({ recreations }) {
  return (
    <RecreationList>
      {recreations.map((recreations, index) => (
        <FlowRecreation
          key={recreations.id}
          index={index}
          recreationTitle={recreations.title}
          keywords={recreations.keywordList}
          playTime={recreations.playTime}
        />
      ))}
    </RecreationList>
  );
}

const RecreationList = styled.ol`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 24rem;
`;
