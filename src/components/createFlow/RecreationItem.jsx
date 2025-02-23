import React, { useState } from 'react';
import circleXIcon from '../../assets/circle_x.svg';
import KeywordChip from '../common/chip/KeywordChip';
import styled from 'styled-components';
import DeleteRecreationConfirmTooltip from './DeleteRecreationConfirmTooltip';
import AlertMessage from '../common/AlertMessage';
import { useFormState, useWatch } from 'react-hook-form';

export default function RecreationItem({
  index,
  removeRecreation,
  recreationTitle,
  keywords,
  register,
  control,
}) {
  const [isDeleteConfirmTooltipOpen, setIsDeleteConfirmTooltipOpen] = useState(false);

  const { playTime } = useWatch({
    name: `recreations.${index}`,
    control,
  });

  const { errors } = useFormState({ control, name: `recreations` });
  const error = errors.recreations?.[index];

  const handleXClick = () => {
    setIsDeleteConfirmTooltipOpen(true);
  };

  const handleDeleteClick = () => {
    removeRecreation(index);
    setIsDeleteConfirmTooltipOpen(false);
  };

  const handleCancelClick = () => {
    setIsDeleteConfirmTooltipOpen(false);
  };

  const playTimeBarHeight = playTime ? (playTime / 10) * 10 : 10;

  const TOOLTIP_ID = `delete-confirm-${index}`;

  return (
    <FlowRecreationContainer>
      <PlayTimeBar $height={playTimeBarHeight} />
      <RecreationContent>
        <TitleBox>
          <NumCircle>{index + 1}</NumCircle>
          <Title>{recreationTitle}</Title>
          <DeleteButton data-tooltip-id={TOOLTIP_ID} onClick={handleXClick}>
            <img src={circleXIcon} width={20} alt="삭제" />
          </DeleteButton>
          <DeleteRecreationConfirmTooltip
            tooltipId={TOOLTIP_ID}
            isOpen={isDeleteConfirmTooltipOpen}
            onDelete={handleDeleteClick}
            onCancel={handleCancelClick}
          />
        </TitleBox>
        <KeywordBox>
          {keywords.map((keyword) => (
            <KeywordChip key={keyword.key} text={keyword.value} />
          ))}
        </KeywordBox>
        <PlayTimeBox>
          플레이까지
          <PlayTimeInput
            placeholder="10"
            {...register(`recreations.${index}.playTime`, { required: true, min: 1 })}
          />
          <span className="minute">분</span>
          <ErrorWrapper className="playTime">
            {error?.playTime && <AlertMessage message="플레이 시간을 입력해주세요." />}
          </ErrorWrapper>
        </PlayTimeBox>
      </RecreationContent>
    </FlowRecreationContainer>
  );
}

const PlayTimeBar = styled.div`
  background: ${({ theme }) => theme.color.secondary04};
  width: 0.5rem;
  height: ${({ $height }) => `${$height}rem`};
  border-radius: 9999px;
`;

const FlowRecreationContainer = styled.li`
  display: flex;
  gap: 0.8rem;
`;

const RecreationContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;

const TitleBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const KeywordBox = styled.div`
  display: flex;
  gap: 0.5rem;
  width: 100%;
`;

const NumCircle = styled.span`
  background-color: ${({ theme }) => theme.color.secondary04};
  width: 2.6rem;
  height: 2.6rem;
  ${({ theme }) => theme.text.h4};
  border-radius: 9999px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  ${({ theme }) => theme.text.h4}
  width: 70%;
`;

const PlayTimeBox = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;
  ${({ theme }) => theme.text.small};

  span.minute {
    ${({ theme }) => theme.text.smallBold};
  }
`;

const PlayTimeInput = styled.input`
  margin-left: 1.2rem;
  font-weight: 700;
  border: none;
  ${({ theme }) => theme.text.smallBold};
  width: 1.1rem;

  &::placeholder {
    color: ${({ theme }) => theme.color.grayscale04};
  }
`;

const DeleteButton = styled.button`
  padding: 0;
  height: 1.25rem;
`;

const ErrorWrapper = styled.div`
  &.title {
    margin-left: 3.3rem;
    margin-top: -1rem;
  }

  &.keywords {
    margin-top: -0.5rem;
  }

  &.playTime {
    margin-left: 0.5rem;
  }
`;
