import React, { Fragment } from 'react';
import styled from 'styled-components';

export default function CreateFlowStepper({ currentStep, historyReplaceFn: replace }) {
  const steps = [
    {
      step: 'basic-info',
      name: '기본정보',
    },
    {
      step: 'detail-info',
      name: '세부정보',
    },
    {
      step: 'recommended-flows',
      name: '추천 플로우',
    },
    {
      step: 'flow-contents',
      name: '플로우 내용',
    },
  ];

  const renderSteps = () =>
    steps.map(({ step, name }, index) => (
      <Fragment key={step}>
        <Step onClick={() => replace(step)}>
          <StepOrder $current={step === currentStep}>{index + 1}</StepOrder>
          <StepName $current={step === currentStep}>{name}</StepName>
        </Step>
        {index !== steps.length - 1 && <Seperator />}
      </Fragment>
    ));

  return <Container>{renderSteps()}</Container>;
}

const Container = styled.div`
  background-color: ${({ theme }) => theme.color.main05};
  border: 1px solid ${({ theme }) => theme.color.grayscale05};
  border-radius: 1.25rem;
  display: flex;
  padding: 3.5rem 0;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  width: 84rem;
`;

const Step = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ theme }) => theme.text.h4}
  gap: 0.4rem;
  cursor: pointer;
`;

const StepOrder = styled.span`
  background-color: ${({ theme, $current }) =>
    $current ? theme.color.main01 : theme.color.grayscale05};
  border-radius: 9999px;
  color: ${({ theme }) => theme.color.main05};
  width: 2.6rem;
  height: 2.6rem;
  text-align: center;
  line-height: 2.6rem;
  transition: background-color 0.2s;
`;

const StepName = styled.span`
  color: ${({ theme, $current }) => ($current ? theme.color.main01 : theme.color.grayscale05)};
  transition: color 0.2s;
`;

const Seperator = styled.div`
  border-top-color: ${({ theme }) => theme.color.grayscale05};
  border-top-style: solid;
  border-top-width: 1px;
  width: 5rem;
`;
