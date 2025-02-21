import circleXIcon from '../../assets/circle_x.svg';
import React, { useState } from 'react';
import styled from 'styled-components';
import KeywordModal from '../main/KeywordModal';
import KEYWORD_CATEGORY from '../../constants/searchKeywordCategory';
import KEYWORD from '../../constants/enum/keyword';
import { Controller, useWatch } from 'react-hook-form';
import KeywordChip from '../common/chip/KeywordChip';
import DeleteRecreationConfirmTooltip from './DeleteRecreationConfirmTooltip';

export default function CustomRecreationItem({ index, register, removeRecreation, control }) {
  const [isDeleteConfirmTooltipOpen, setIsDeleteConfirmTooltipOpen] = useState(false);
  const [isKeywordModalOpen, setIsKeywordModalOpen] = useState(false);

  const { keywords, playTime } = useWatch({
    name: `recreations.${index}`,
    control,
  });

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

  const TOOLTIP_ID = `delete-confirm-${index}`;

  return (
    <Container>
      <PlayTimeBar $height={playTimeBarHeight} />
      <RecreationContent>
        <TitleBox>
          <NumCircle>{index + 1}</NumCircle>
          <TitleInput
            placeholder="레크레이션 제목 입력"
            {...register(`customRecreations.${index}.title`)}
          />
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
        <KeywordBox onClick={handleKeywordBoxClick}>
          {!keywords.length ? (
            <span>이곳을 클릭하여 3개의 키워드를 선택해주세요.</span>
          ) : (
            renderSelectedKeywords()
          )}
        </KeywordBox>
        <PlayTimeBox>
          플레이까지
          <PlayTimeInput placeholder="10" {...register(`customRecreations.${index}.playTime`)} />
          <span>분</span>
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
                limit={3}
              />
            )
          );
        }}
        name={`recreations.${index}.keywords`}
        control={control}
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
  margin-top: 1rem;
  ${({ theme }) => theme.text.small};

  span {
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
