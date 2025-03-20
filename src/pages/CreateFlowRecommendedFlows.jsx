import styled, { css } from 'styled-components';
import StepDescriptionBox from '../components/createFlow/StepDescriptionBox';
import React, { useEffect, useState } from 'react';
import FlowRecreationList from '../components/common/FlowRecreationList';
import NoData from '../components/common/NoData';
import imgGo4 from '../assets/flowwrite/ImgGo4.png';
import arrow from '../assets/fast_arrow.svg';
import StepControl from '../components/createFlow/StepControl';
import { privateAPI } from '../apis/user';
import LoadingSpinner from '../components/common/LoadingSpinner';
import useModal from '../hooks/useModal';
import ChangeRecommendFlowConfirmModal from '../components/modal/ChangeRecommendFlowConfirmModal';

export default function CreateFlowRecommendedFlows({
  context,
  onBack,
  onNext,
  saveContext,
  validateRef,
}) {
  const [recommendedFlows, setRecommendedFlows] = useState([]);
  const [selectedFlowId, setSelectedFlowId] = useState(context.recommendedFlowId);
  const [isLoading, setIsLoading] = useState(true);
  const [targetFlowId, setTargetFlowId] = useState(null);

  const {
    ModalWrapper,
    closeModal: closeChangeFlowConfirmModal,
    openModal: openChangeFlowConfirmModal,
  } = useModal();

  useEffect(() => {
    validateRef.current = (onValid) => onValid;
  }, [validateRef]);

  useEffect(() => {
    const fetchFlowData = async () => {
      try {
        setIsLoading(true);
        const response = await privateAPI.get(`/api/flows/recommended`, {
          params: {
            keyword: context.keywords.map((keyword) => keyword.key), // 키워드 사용
            participants: context.participants,
            playTime: context.totalPlayTime, // 플레이 시간 사용
            purpose: context.purposes.map((purpose) => purpose.key), // 목적 사용
            gender: context.genders.map((gender) => gender.key),
            age: context.ageGroups.map((age) => age.key),
          },
        });

        if (response.data.result) {
          const validFlowData = response.data.result.filter(
            (flow) => flow.flowDetail.totalPlayTime === context.totalPlayTime,
          );
          setRecommendedFlows(validFlowData);
        }
        setIsLoading(false);
      } catch (error) {
        console.error('API Error:', error);
      }
    };

    fetchFlowData();
  }, []);

  const handleFlowClick = (flowId) => {
    if (selectedFlowId === flowId) {
      return;
    }

    if (!!context.recreations.length) {
      setTargetFlowId(flowId);
      openChangeFlowConfirmModal();
    } else {
      setSelectedFlowId(flowId);
      saveContext({ recommendedFlowId: flowId, recreations: [] });
    }
  };

  const handleCardButtonClick = () => {
    onNext(selectedFlowId);
  };

  const handleNextClick = () => {
    onNext(selectedFlowId);
  };

  const handleBackClick = () => {
    onBack(selectedFlowId);
  };

  return (
    <Container>
      <StepDescriptionBox>
        입력한 내용을 기반으로 한 추천 플로우입니다. 저장하고 싶은 플로우를 <strong>클릭</strong>
        하여 선택해주세요.
      </StepDescriptionBox>
      <FlowsWrapper>
        {isLoading ? (
          <LoadingSpinner />
        ) : recommendedFlows.length === 0 ? (
          <NoData variant="cfRecommendedFlows" />
        ) : (
          recommendedFlows.map((flow, index) => (
            <FlowContainer
              onClick={() => handleFlowClick(flow.flowDetail.id)}
              key={flow.flowDetail.id}
              className={selectedFlowId === flow.flowDetail.id && 'selected'}
            >
              <HeaderRow>
                <h3>{flow.flowDetail.title}</h3>
                <Index className={selectedFlowId === flow.flowDetail.id && 'selected'}>
                  {index + 1}안
                </Index>
              </HeaderRow>
              <ListWrapper>
                <FlowRecreationList recreations={flow.recreations} />
              </ListWrapper>
            </FlowContainer>
          ))
        )}
      </FlowsWrapper>
      <CardButton onClick={handleCardButtonClick}>
        <CardButtonTextContainer>
          <CardButtonText>바로 플로우 작성하기</CardButtonText>
          <CardButtonSubText>
            원하는 플로우를 작성할 수 있도록
            <br />
            아브아브가 도와줄게요!
          </CardButtonSubText>
        </CardButtonTextContainer>
        <img src={imgGo4} alt="go 4" style={{ width: '120px', height: '120px' }} />
        <ArrowIcon src={arrow} />
      </CardButton>

      <StepControl onNext={handleNextClick} onBack={handleBackClick} />

      <ModalWrapper>
        <ChangeRecommendFlowConfirmModal
          close={closeChangeFlowConfirmModal}
          onChangeClick={() => {
            setSelectedFlowId(targetFlowId);
            saveContext({ recommendedFlowId: targetFlowId, recreations: [] });
          }}
        />
      </ModalWrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const FlowsWrapper = styled.div`
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  min-height: 20rem;
`;

const FlowContainer = styled.div`
  border-radius: 1.25rem;
  display: flex;
  flex-direction: column;
  border: 1px solid ${({ theme }) => theme.color.grayscale05};
  padding: 2rem 0;
  width: 50%;
  gap: 4rem;
  transition:
    border-color 0.3s,
    box-shadow 0.3s;
  cursor: pointer;

  &.selected {
    border-width: 2px;
    border-color: ${({ theme }) => theme.color.main02};
    box-shadow: 0 0 20px ${({ theme }) => theme.color.grayscale01}26;
  }
`;

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.5rem;

  h3 {
    text-align: center;
    padding-left: 5.75rem;
    flex: 1;
    ${({ theme }) => theme.text.h4};
  }
`;

const Index = styled.span`
  ${({ theme }) => theme.text.button};
  width: 5.75rem;
  text-align: center;
  padding: 0.5rem 0;
  border-radius: 9999px;
  border: 1px solid ${({ theme }) => theme.color.grayscale01};
  transition:
    background-color 0.3s,
    color 0.3s,
    border-color 0.3s;

  &.selected {
    ${({ theme }) => css`
      background-color: ${theme.color.main02};
      color: ${theme.color.main05};
      border-color: ${theme.color.main02};
    `}
  }
`;

const ListWrapper = styled.div`
  padding: 0 4rem;
`;

const CardButton = styled.button`
  border-radius: 1.25rem;
  background-color: ${({ theme }) => theme.color.main04};
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12.5rem;
  height: 13rem;
  position: relative;
  margin: 3rem 0 7.5rem;
`;

const CardButtonTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const CardButtonText = styled.span`
  ${({ theme }) => theme.text.button};
  text-align: right;
`;

const CardButtonSubText = styled.span`
  ${({ theme }) => theme.text.small};
  text-align: right;
  line-height: normal;
`;

const ArrowIcon = styled.img`
  position: absolute;
  right: 2.5rem;
`;
