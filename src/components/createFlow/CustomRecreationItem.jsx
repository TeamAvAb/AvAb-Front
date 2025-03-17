import circleXIcon from '../../assets/circle_x.svg';
import React, { useState } from 'react';
import KeywordModal from '../main/KeywordModal';
import KEYWORD_CATEGORY from '../../constants/searchKeywordCategory';
import KEYWORD from '../../constants/enum/keyword';
import { Controller, useFormState, useWatch } from 'react-hook-form';
import KeywordChip from '../common/chip/KeywordChip';
import DeleteRecreationConfirmTooltip from './DeleteRecreationConfirmTooltip';
import AlertMessage from '../common/AlertMessage';
import RecreationKeywordTooltip from './RecreationKeywordTooltip';
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

export default function CustomRecreationItem({ index, register, removeRecreation, control }) {
  const [isDeleteConfirmTooltipOpen, setIsDeleteConfirmTooltipOpen] = useState(false);
  const [isKeywordModalOpen, setIsKeywordModalOpen] = useState(false);

  const { keywords, playTime } = useWatch({
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

  const handleKeywordBoxClick = () => {
    setIsKeywordModalOpen(true);
  };

  const renderSelectedKeywords = () => {
    return keywords.map((keyword) => <KeywordChip key={keyword.key} text={keyword.value} />);
  };

  const DELETE_TOOLTIP_ID = `delete-confirm-${index}`;
  const KEYWORD_TOOLTIP_ID = `select-keyword-tooltip`;

  return (
    <Container $playTime={playTime}>
      <PlayTimeBar />
      <RecreationContent>
        <TitleBox>
          <NumCircle>{index + 1}</NumCircle>
          <TitleInput
            placeholder="레크레이션 제목 입력"
            {...register(`recreations.${index}.title`, {
              required: { value: true, message: '제목을 입력해주세요.' },
              minLength: { value: 2, message: '2자에서 15자 사이로 입력해주세요.' },
              maxLength: { value: 15, message: '2자에서 15자 사이로 입력해주세요.' },
            })}
          />
          <DeleteButton data-tooltip-id={DELETE_TOOLTIP_ID} onClick={handleXClick}>
            <img src={circleXIcon} width={20} alt="삭제" />
          </DeleteButton>
          <DeleteRecreationConfirmTooltip
            tooltipId={DELETE_TOOLTIP_ID}
            isOpen={isDeleteConfirmTooltipOpen}
            onDelete={handleDeleteClick}
            onCancel={handleCancelClick}
          />
        </TitleBox>
        <ErrorWrapper className="title">
          {error?.title && <AlertMessage message={error?.title.message} />}
        </ErrorWrapper>
        <KeywordBox
          onClick={handleKeywordBoxClick}
          data-tooltip-id={!!keywords.length ? KEYWORD_TOOLTIP_ID : ''}
        >
          {!keywords.length ? (
            <span>이곳을 클릭하여 3개의 키워드를 선택해주세요.</span>
          ) : (
            renderSelectedKeywords()
          )}
        </KeywordBox>
        <RecreationKeywordTooltip tooltipId={KEYWORD_TOOLTIP_ID} />

        <ErrorWrapper className="keywords">
          {error?.keywords && <AlertMessage message={error?.keywords.message} />}
        </ErrorWrapper>
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
      <Controller
        render={({ field: { value, onChange } }) => {
          return (
            isKeywordModalOpen && (
              <KeywordModal
                category={KEYWORD_CATEGORY.KEYWORD}
                content={Object.values(KEYWORD)}
                selectedOption={value}
                modalControl={setIsKeywordModalOpen}
                keywordControl={onChange}
                min={3}
                max={3}
              />
            )
          );
        }}
        name={`recreations.${index}.keywords`}
        control={control}
        rules={{ required: { value: true, message: '키워드를 3개 선택해주세요.' } }}
      />
    </Container>
  );
}

const TitleInput = styled.input`
  display: flex;
  flex-direction: column;
  justify-content: center;
  ${({ theme }) => theme.text.h4}
  border: none;
  width: 70%;

  &::placeholder {
    color: ${({ theme }) => theme.color.grayscale04};
  }
`;
