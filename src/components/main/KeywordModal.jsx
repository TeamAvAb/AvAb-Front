import React, { useState } from 'react';
import styled from 'styled-components';
import rechoiceIcon from '../../assets/main/rechoiceIcon.svg';
import Button from '../common/button/Button';
import BaseKeywordChip from '../common/chip/KeywordChip';
import BasePurposeChip from '../common/chip/PurposeChip';
import KEYWORD_CATEGORY from '../../constants/searchKeywordCategory';

export default function KeywordModal({
  category,
  content,
  modalControl,
  keywordControl,
  selectedOption,
}) {
  const [result, setResult] = useState(selectedOption);
  const handleKeywordClick = (option) => {
    const isSelected = selectedOption.includes(option) || result.includes(option);
    if (isSelected) {
      // 단일 선택 해제 시 체크된 아이템을 제외한 배열 (필터)
      setResult((prev) => prev.filter((el) => el.key !== option.key));
    } else {
      // 단일 선택 시 체크된 아이템을 배열에 추가
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
            <Button backgroundColor="main02" color="main05" onClick={handleSubmit}>
              선택 완료
            </Button>
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
