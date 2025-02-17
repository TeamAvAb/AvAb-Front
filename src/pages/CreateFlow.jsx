import { useFunnel } from '@use-funnel/react-router-dom';
import CreateFlowBasicInfo from './CreateFlowBasicInfo';
import CreateFlowDetailInfo from './CreateFlowDetailInfo';
import CreateFlowRecommendFlows from './CreateFlowRecommendFlows';
import { CreateFlowFlowContents } from './CreateFlowFlowContents';
import CreateFlowStepper from '../components/createFlow/CreateFlowStepper';
import styled from 'styled-components';

export default function CreateFlow() {
  const initialContext = {
    purposes: [],
    totalPlayTime: 0,
    keywords: [],
    genders: [],
    ageGroups: [],
    participants: null,
    recommendedFlowId: null,
    title: '',
    recreations: [],
  };

  const funnel = useFunnel({
    id: 'create-flow',
    initial: {
      step: 'basic-info',
      context: initialContext,
    },
  });

  const handleBasicInfoStepNext = async (purposes, totalPlayTime) => {
    await funnel.history.push('detail-info', { purposes, totalPlayTime });
  };

  const handleDetailInfoStepNext = async (to, keywords, genders, ageGroups, participants) => {
    await funnel.history.push(to, { keywords, genders, ageGroups, participants });
  };

  const handleDetailInfoStepBack = async () => {
    await funnel.history.back();
  };

  const handleRecommendedFlowsStepNext = async (recommendedFlowId) => {
    await funnel.history.push('flow-contents', { recommendedFlowId });
  };

  const handleRecommendedFlowsStepBack = async () => {
    await funnel.history.back();
  };

  const handleFlowContentsStepBack = async () => {
    await funnel.history.back();
  };

  const renderStep = () => {
    switch (funnel.step) {
      case 'basic-info':
        return <CreateFlowBasicInfo onNext={handleBasicInfoStepNext} />;
      case 'detail-info':
        return (
          <CreateFlowDetailInfo
            context={funnel.context}
            onNext={handleDetailInfoStepNext}
            onBack={handleDetailInfoStepBack}
          />
        );
      case 'recommended-flows':
        return (
          <CreateFlowRecommendFlows
            context={funnel.context}
            onNext={handleRecommendedFlowsStepNext}
            onBack={handleRecommendedFlowsStepBack}
          />
        );
      case 'flow-contents':
        return (
          <CreateFlowFlowContents context={funnel.context} onBack={handleFlowContentsStepBack} />
        );
    }
  };

  return (
    <Wrapper>
      <CreateFlowStepper currentStep={funnel.step} historyReplaceFn={funnel.history.replace} />
      <StepWrapper>{renderStep()}</StepWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.color.grayscale07};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2.5rem 0;
  gap: 2rem;
`;

const StepWrapper = styled.section`
  background-color: ${({ theme }) => theme.color.main05};
  display: flex;
  width: 84rem;
  border: 1px solid ${({ theme }) => theme.color.grayscale05};
  border-radius: 1.25rem;
  padding: 2.5rem 7.25rem;
  box-sizing: border-box;
`;
