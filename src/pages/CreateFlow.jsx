import { useFunnel } from '@use-funnel/react-router-dom';
import CreateFlowBasicInfo from './CreateFlowBasicInfo';
import CreateFlowDetailInfo from './CreateFlowDetailInfo';
import CreateFlowRecommendFlows from './CreateFlowRecommendFlows';
import { CreateFlowFlowContents } from './CreateFlowFlowContents';

export default function CreateFlow() {
  const initialContext = {
    purposes: [],
    totalPlayTime: 0,
    keywords: [],
    genders: [],
    ageGroups: [],
    participants: null,
    recommendedFlows: [],
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

  const handleRecommendedFlowsStepNext = async (recommendedFlows) => {
    await funnel.history.push('flow-contents', { recommendedFlows });
  };

  const handleRecommendedFlowsStepBack = async () => {
    await funnel.history.back();
  };

  const handleFlowContentsStepBack = async () => {
    await funnel.history.back();
  };

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
        <CreateFlowFlowContents context={funnel.context} onBack={handleRecommendedFlowsStepBack} />
      );
  }
}
