import React, { useState } from 'react';
import circleXIcon from '../../assets/circle_x.svg';
import KeywordChip from '../common/chip/KeywordChip';
import DeleteRecreationConfirmTooltip from './DeleteRecreationConfirmTooltip';
import AlertMessage from '../common/AlertMessage';
import { useFormState, useWatch } from 'react-hook-form';
import {
  Container,
  DeleteButton,
  ErrorWrapper,
  KeywordBox,
  NumCircle,
  PlayTimeBar,
  PlayTimeBox,
  PlayTimeInput,
  RecreationContent,
  TitleBox,
} from './style/RecreationItem';
import styled from 'styled-components';

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

  const TOOLTIP_ID = `delete-confirm-${index}`;

  return (
    <Container $playTime={playTime}>
      <PlayTimeBar />
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
          <span className="label">플레이까지</span>
          <PlayTimeInput
            placeholder="10"
            {...register(`recreations.${index}.playTime`, {
              valueAsNumber: true,
              required: { value: true, message: '플레이 시간을 입력해주세요.' },
              min: { value: 10, message: '10분에서 300분 사이로 입력해주세요.' },
              max: { value: 300, message: '10분에서 300분 사이로 입력해주세요.' },
              validate: (value) => value % 10 === 0 || '10분 단위로 입력해주세요.',
            })}
          />
          <span className="minute">분</span>
          <ErrorWrapper className="playTime">
            {error?.playTime && <AlertMessage message={error?.playTime.message} />}
          </ErrorWrapper>
        </PlayTimeBox>
      </RecreationContent>
    </Container>
  );
}

const Title = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  ${({ theme }) => theme.text.h4}
  width: 70%;
`;
