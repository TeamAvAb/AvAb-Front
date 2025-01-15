import React, { useState } from 'react';
import styled from 'styled-components';
import rechoiceIcon from '../../assets/main/rechoiceIcon.svg';
import Button from '../button/Button';
import KeywordChip from '../chip/KeywordChip';
import PurposeChip from '../chip/PurposeChip';

export default function KeywordModal({
  category,
  content,
  modalControl,
  keywordControl,
  selectedOption,
}) {
  const [result, setResult] = useState(selectedOption);
  const handleSingleSelect = (param) => {
    const isSelected = selectedOption.includes(param) || result.includes(param);
    if (isSelected) {
      // 단일 선택 해제 시 체크된 아이템을 제외한 배열 (필터)
      setResult(result.filter((el) => el !== param));
    } else {
      // 단일 선택 시 체크된 아이템을 배열에 추가
      setResult((prev) => [...prev, param]);
    }
  };
  const handleReset = () => {
    setResult('');
  };

  const handleSubmit = () => {
    console.log(selectedOption);
    keywordControl(result);
    modalControl(false);
  };

  const handleClose = () => {
    modalControl(false);
  };

  return (
    <Container>
      <Modal>
        <Keywords category={category}>
          {content.map((el) =>
            category === 'keyword' ? (
              <Keyword
                key={el.param}
                onClick={() => handleSingleSelect(el.param)}
                selected={result.includes(el.param)}
                text={el.value}
              />
            ) : (
              <Purpose
                key={el.param}
                onClick={() => handleSingleSelect(el.param)}
                selected={result.includes(el.param)}
                text={el.value}
              />
            ),
          )}
        </Keywords>
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
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <img
                  src={rechoiceIcon}
                  style={{ width: '2.5rem', height: '2.5rem' }}
                  alt="초기화"
                />
                초기화
              </div>
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
  justify-content: center;
  padding: ${({ category }) => (category === 'keyword' ? '2.5rem 3rem' : '3.5rem 0')};
  gap: ${({ category }) => (category === 'keyword' ? '1.2rem' : '1rem')};
  flex-wrap: wrap;
  box-shadow: 0 -2px 8px 0 rgba(0, 0, 0, 0.2) inset;
`;

const Keyword = styled(KeywordChip)`
  background-color: ${({ theme, selected }) =>
    selected ? theme.color.main03 : theme.color.grayscale06};
  cursor: pointer;
`;

const Purpose = styled(PurposeChip)`
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
