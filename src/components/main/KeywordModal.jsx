import React, { useState } from 'react';
import styled from 'styled-components';
import rechoiceIcon from '../../assets/main/rechoiceIcon.svg';
import Button from '../common/button/Button';
import BaseKeywordChip from '../common/chip/KeywordChip';
import BasePurposeChip from '../common/chip/PurposeChip';
import KEYWORD_CATEGORY from '../../constants/searchKeywordCategory';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import alertIcon from '../../assets/main/alert.svg';

export default function KeywordModal({
  category,
  content,
  modalControl,
  keywordControl,
  selectedOption,
  min,
  max,
}) {
  const [result, setResult] = useState(selectedOption);
  const handleKeywordClick = (option) => {
    const isSelected = result.some((el) => el.key === option.key);
    if (isSelected) {
      setResult((prev) => prev.filter((el) => el.key !== option.key));
    } else {
      setResult((prev) => [...prev, option]);
    }
  };

  const handleReset = () => {
    setResult([]);
  };

  const handleSubmit = () => {
    keywordControl(result);
    modalControl(false);
  };

  const handleClose = () => {
    modalControl(false);
  };

  const TOOLTIP_ID = 'keyword-tooltip';

  const isValidSelection = () => {
    if (min && !max) {
      return result.length >= min;
    } else if (!min && max) {
      return result.length <= max;
    } else if (min && max) {
      if (min === max) {
        return result.length === min;
      }
      return result.length >= min && result.length <= max;
    }

    return true;
  };

  return (
    <Container>
      <Modal>
        <ModalContent>
          <Keywords $category={category}>
            {content.map((el) =>
              category === KEYWORD_CATEGORY.KEYWORD ? (
                <KeywordChip
                  key={el.key}
                  onClick={() => handleKeywordClick(el)}
                  selected={result.some((item) => item.key === el.key)}
                  text={el.value}
                  width="17.5%"
                />
              ) : (
                <PurposeChip
                  key={el.key}
                  onClick={() => handleKeywordClick(el)}
                  selected={result.includes(el)}
                  text={el.value}
                />
              ),
            )}
          </Keywords>
        </ModalContent>

        <SetModal>
          <Button border onClick={handleClose}>
            닫기
          </Button>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Button onClick={handleReset}>
              <img src={rechoiceIcon} style={{ width: '2.5rem', height: '2.5rem' }} alt="초기화" />
              초기화
            </Button>
            <div data-tooltip-id={isValidSelection() ? '' : TOOLTIP_ID}>
              <Button
                backgroundColor={isValidSelection() ? 'main02' : 'grayscale05'}
                color="main05"
                onClick={handleSubmit}
                disabled={!isValidSelection()}
              >
                선택 완료
              </Button>
            </div>
            <Tooltip id={TOOLTIP_ID} opacity={1} offset={5}>
              <TooltipContent>
                <TooltipMessage>
                  <img src={alertIcon} alt="경고" />
                  <span>
                    {KEYWORD_CATEGORY.KEYWORD ? '키워드를 ' : '목적을 '}
                    {min && !max && `${min}개 이상 선택해주세요.`}
                    {!min && max && `${max}개 이하 선택해주세요.`}
                    {min && max
                      ? min === max
                        ? `${min}개 선택해주세요.`
                        : `${min}개 이상 ${max}개 이하 선택해주세요.`
                      : ''}
                  </span>
                </TooltipMessage>
              </TooltipContent>
            </Tooltip>
          </div>
        </SetModal>
      </Modal>
    </Container>
  );
}
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  background: ${({ theme }) => theme.color.grayscale01}80;
  z-index: 10;
`;

const Modal = styled.div`
  position: absolute;
  top: 18rem;
  width: 48rem;
  border-radius: 1.2rem;
  background: ${({ theme }) => theme.color.main05};
`;

const Keywords = styled.div`
  display: flex;
  gap: ${({ $category }) => ($category === 'keyword' ? '1.2rem' : '1rem')};
  flex-wrap: wrap;
`;

const KeywordChip = styled(BaseKeywordChip)`
  background-color: ${({ theme, selected }) =>
    selected ? theme.color.main03 : theme.color.grayscale06};
  cursor: pointer;
`;

const PurposeChip = styled(BasePurposeChip)`
  background-color: ${({ theme, selected }) =>
    selected ? theme.color.main03 : theme.color.grayscale07};
  cursor: pointer;
  border: 1px solid ${({ theme, selected }) => (selected ? 'transparent' : theme.color.grayscale01)};
`;

const SetModal = styled.div`
  padding: 1rem 2rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-top: 1px solid ${({ theme }) => theme.color.grayscale03};
  box-shadow: 0 -2px 8px 0 rgba(0, 0, 0, 0.2);
  align-items: center;
`;

const ModalContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 -2px 8px 0 rgba(0, 0, 0, 0.2) inset;
  padding: ${({ $category }) => ($category === 'keyword' ? '2.5rem' : '3.5rem')};
`;

const Tooltip = styled(ReactTooltip)`
  background: ${({ theme }) => theme.color.grayscale03} !important;
  padding: 1.2rem !important;
  border-radius: 1.2rem !important;
`;

const TooltipContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const TooltipMessage = styled.div`
  display: flex;
  gap: 1rem;
  color: ${({ theme }) => theme.color.main04};
  ${({ theme }) => theme.text.paragraph};
  text-align: center;
  line-height: normal;
`;
