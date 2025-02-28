import circleXIcon from '../../assets/circle_x.svg';
import React, { useState } from 'react';
import styled from 'styled-components';
import KeywordModal from '../main/KeywordModal';
import KEYWORD_CATEGORY from '../../constants/searchKeywordCategory';
import KEYWORD from '../../constants/enum/keyword';
import { Controller, useFormState, useWatch } from 'react-hook-form';
import KeywordChip from '../common/chip/KeywordChip';
import DeleteRecreationConfirmTooltip from './DeleteRecreationConfirmTooltip';
import AlertMessage from '../common/AlertMessage';
import RecreationKeywordTooltip from './RecreationKeywordTooltip';

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

  const playTimeBarHeight = playTime ? (playTime / 10) * 10 : 10;

  const DELETE_TOOLTIP_ID = `delete-confirm-${index}`;
  const KEYWORD_TOOLTIP_ID = `select-keyword-tooltip`;

  return (
    <Container>
      <PlayTimeBar $height={playTimeBarHeight} />
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

const Container = styled.li`
  display: flex;
  gap: 0.8rem;
`;

const PlayTimeBar = styled.div`
  background: ${({ theme }) => theme.color.secondary04};
  width: 0.5rem;
  height: ${({ $height }) => `${$height}rem`};
  border-radius: 9999px;
`;

const RecreationContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const TitleBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
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
    max-width: 60%;
  }
`;

const KeywordBox = styled.button`
  display: flex;
  gap: 0.5rem;
  text-align: left;
  padding: 0;

  span {
    background-color: ${({ theme }) => theme.color.grayscale06};
    border-radius: 5px;
    padding: 0.5rem 0.8rem;
    color: ${({ theme }) => theme.color.grayscale04};
    width: 100%;
  }
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

const PlayTimeBox = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;
  ${({ theme }) => theme.text.small};

  span.minute {
    ${({ theme }) => theme.text.smallBold};
  }

  span.label {
    width: 6rem;
  }
`;

const PlayTimeInput = styled.input`
  font-weight: 700;
  border: none;
  ${({ theme }) => theme.text.smallBold};
  width: 1.7rem;
  text-align: right;

  &::placeholder {
    color: ${({ theme }) => theme.color.grayscale04};
  }
`;

const DeleteButton = styled.button`
  padding: 0;
  height: 1.25rem;
`;
