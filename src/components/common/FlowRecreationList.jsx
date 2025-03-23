import FlowRecreation from '../recreation/FlowRecreation';
import styled from 'styled-components';

export default function FlowRecreationList({ recreations }) {
  return (
    <RecreationList>
      {recreations.map((recreation, index) => (
        <FlowRecreation
          key={recreation.id}
          index={index}
          recreationTitle={recreation.title}
          keywords={recreation.keywordList}
          playTime={recreation.playTime}
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
  height: 100rem;
`;
