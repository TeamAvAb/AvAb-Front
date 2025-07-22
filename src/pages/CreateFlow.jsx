import { useFunnel } from '@use-funnel/react-router-dom';
import CreateFlowBasicInfo from './CreateFlowBasicInfo';
import CreateFlowDetailInfo from './CreateFlowDetailInfo';
import CreateFlowRecommendedFlows from './CreateFlowRecommendedFlows';
import CreateFlowFlowContent from './CreateFlowFlowContent';
import CreateFlowStepper from '../components/createFlow/CreateFlowStepper';
import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import { useBlocker } from 'react-router';
import CreateFlowPreventLeaveModal from '../components/modal/CreateFlowPreventLeaveModal';
import useModal from '../hooks/useModal';

export default function CreateFlow() {
  const [isFlowSaving, setIsFlowSaving] = useState(false);

  const initialContext = {
    purposes: [],
    totalPlayTime: null,
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

  const validateStepRef = useRef(() => () => {});

  const isContextEmpty = () =>
    Object.values(funnel.context).every(
      (value) => value === null || value === 0 || value === '' || value.length === 0,
    );

  const shouldBlock = ({ currentLocation, nextLocation }) =>
    !isContextEmpty() && currentLocation.pathname !== nextLocation.pathname;

  const blocker = useBlocker(shouldBlock);

  const {
    ModalWrapper: PreventLeaveModalWrapper,
    openModal: openPreventLeaveModal,
    closeModal: closePreventLeaveModal,
  } = useModal();

  useEffect(() => {
    if (blocker.state === 'blocked') {
      if (isFlowSaving) {
        blocker.proceed();
        return;
      }
      openPreventLeaveModal();
    }
  }, [openPreventLeaveModal, isFlowSaving, blocker]);

  const handleBasicInfoStepNext = async (purposes, totalPlayTime) => {
    await funnel.history.push('detail-info', { purposes, totalPlayTime });
  };

  const handleDetailInfoStepNext = async (to, keywords, genders, ageGroups, participants) => {
    await funnel.history.push(to, { keywords, genders, ageGroups, participants });
  };

  const handleDetailInfoStepBack = async (keywords, genders, ageGroups, participants) => {
    await funnel.history.push('basic-info', { keywords, genders, ageGroups, participants });
  };

  const handleRecommendedFlowsStepNext = async (recommendedFlowId) => {
    await funnel.history.push('flow-contents', { recommendedFlowId });
  };

  const handleRecommendedFlowsStepBack = async (recommendedFlowId) => {
    await funnel.history.push('detail-info', { recommendedFlowId });
  };

  const handleFlowContentsStepBack = async (title, recreations) => {
    await funnel.history.push('recommended-flows', { title, recreations });
  };

  const handleStepClick = async (step) => {
    validateStepRef.current(async () => await funnel.history.push(step, funnel.context))();
  };

  const handleFlowSaved = () => {
    setIsFlowSaving(true);
  };

  const saveContext = async (data) => {
    await funnel.history.replace(funnel.step, data);
  };

  const proceedNavigation = () => blocker.proceed();

  const blockNavigation = () => blocker.reset();

  const renderStep = () => {
    switch (funnel.step) {
      case 'basic-info':
        return (
          <CreateFlowBasicInfo
            onNext={handleBasicInfoStepNext}
            context={funnel.context}
            validateRef={validateStepRef}
            saveContext={saveContext}
          />
        );
      case 'detail-info':
        return (
          <CreateFlowDetailInfo
            context={funnel.context}
            onNext={handleDetailInfoStepNext}
            onBack={handleDetailInfoStepBack}
            validateRef={validateStepRef}
            saveContext={saveContext}
          />
        );
      case 'recommended-flows':
        return (
          <CreateFlowRecommendedFlows
            context={funnel.context}
            onNext={handleRecommendedFlowsStepNext}
            onBack={handleRecommendedFlowsStepBack}
            saveContext={saveContext}
            validateRef={validateStepRef}
          />
        );
      case 'flow-contents':
        return (
          <CreateFlowFlowContent
            context={funnel.context}
            onBack={handleFlowContentsStepBack}
            onFlowSaved={handleFlowSaved}
            saveContext={saveContext}
            validateRef={validateStepRef}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Wrapper>
      <CreateFlowStepper currentStep={funnel.step} onStepClick={handleStepClick} />
      <StepWrapper $wide={funnel.step === 'flow-contents'}>{renderStep()}</StepWrapper>
      <PreventLeaveModalWrapper>
        <CreateFlowPreventLeaveModal
          close={closePreventLeaveModal}
          onLeaveClick={proceedNavigation}
          onStayClick={blockNavigation}
        />
      </PreventLeaveModalWrapper>
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
  padding: 2.5rem ${({ $wide }) => ($wide ? '2.5rem' : '7.25rem')};
  box-sizing: border-box;
`;
