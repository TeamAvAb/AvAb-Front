import React, { useState } from 'react';
import styled from 'styled-components';
import rechoice from '../../assets/flowwrite/rechoice.png';

const PurposeKeywordModal = ({ onClose, onSelectKeywords, selectedKeywords: propSelectedKeywords }) => {
    console.log("Selected Keywords in WriteKeywordModal:", propSelectedKeywords);
    const [internalSelectedKeywords, setInternalSelectedKeywords] = useState([]);
    const keywordGroups = ['신년회', 'MT', '워크샵', '이벤트', '축제'];
    
    const handleKeywordClick = (keyword) => {
      console.log(`Clicked keyword button with value: ${keyword}`);
      if (internalSelectedKeywords.includes(keyword)) {
        // 키워드가 이미 선택되었는지 확인
        setInternalSelectedKeywords(internalSelectedKeywords.filter((selected) => selected !== keyword));
      } else {
        // 클릭을 기반으로 선택한 키워드 업데이트
        setInternalSelectedKeywords([...internalSelectedKeywords, keyword]);
      }
  };

  const handleResetKeywords = () => {
      // 선택된 키워드 리셋
      setInternalSelectedKeywords([]);
  };

  const handleSelectKeywords = () => {
    console.log("Selected Keywords before update:", internalSelectedKeywords);
    onSelectKeywords(internalSelectedKeywords);
    console.log("Selected Keywords after update:", internalSelectedKeywords);
    setInternalSelectedKeywords([]);
    onClose();
};

  return (
    <>
      <ModalOverlay onClick={onClose} />
      <ModalContent>
        <KeywordWrap>
      {keywordGroups.map((keyword) => (
              <KeywordButton key={keyword} onClick={() => handleKeywordClick(keyword)}>
                <KeywordSpan clicked={internalSelectedKeywords.includes(keyword)}>{keyword}</KeywordSpan>
              </KeywordButton>
            ))}
            </KeywordWrap>
        <BottomContainer>
        <CloseButton onClick={onClose}>
            닫기
          </CloseButton>
          <RechoiceButton onClick={handleResetKeywords}>
          <img src={rechoice} alt="Rechoice" style={{ width: '42px', height: '42px' }} />
          초기화
          </RechoiceButton>
          <KeywordSelectButton onClick={handleSelectKeywords}>
            선택 완료
          </KeywordSelectButton>
        </BottomContainer>
      </ModalContent>
    </>
  );
};

export default PurposeKeywordModal;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #464C52; /* Dark overlay color */
  opacity: 0.8; /* Adjust the opacity as needed */
  z-index: 1000; /* Ensure the modal is above other elements */
`;

const ModalContent = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 760px;
  height: 258px;
  background-color: #FFF;
  border: 0.5px solid #CACDD2;
  border-radius: 20px;
  z-index: 1001; /* Ensure the modal is above the overlay */
`;

const KeywordWrap = styled.div`
  padding-left: 69px;
`;

const KeywordButton = styled.div`
  display: inline-block;
  margin-top: 58px;
  margin-bottom: 58px;
`;

const KeywordSpan = styled.span`
  display: inline-flex;
  padding: 16px 34px;
  border-radius: 50px;
  border: 1px solid #1B1D1F;
  background-color: ${({ clicked }) => (clicked ? '#A0DDFF' : '#F7F8F9')};
  justify-content: center;
  align-items: center;
  display: flex;
  margin-right: 15px;
  color: #1B1D1F;
  font-size: 20px;
  font-weight: 700;
  cursor: pointer;
`;

const BottomContainer = styled.div`
  height: 70px;
  border-top: 0.5px solid var(--gray-scale-464-c-52, #464C52);
  background: #FFF;

  display: flex;
  align-items: center;
`;

const CloseButton = styled.button`
  width: 101px;
  height: 54px;
  color: #464C52;
  background-color: #fff;
  border: 1px solid #1B1D1F;
  border-radius: 50px;
  font-size: 19px;
  font-weight: 700;
  cursor: pointer;
  margin-left: 31px;
  margin-top: 16px;

  /* 선택적으로 hover 효과 추가 */
  &:hover {
    background-color: #F7F8F9; /* hover 시의 배경색 변경 */
  }
`;


const RechoiceButton = styled.button`
  height: 42px;
  color: #000;
  background-color: #fff;
  border: none;
  font-size: 19px;
  font-weight: 700;
  cursor: pointer;
  margin-left: 310px;
  margin-top: 16px;
  display: inline-flex;
  align-items: center;
`;

const KeywordSelectButton = styled.button`
    width: 138px;
    height: 54px;
    background-color: #4036ED;
    border: none;
    border-radius: 50px;
    font-size: 19px;
    font-weight: 700;
    color: #fff;
    cursor: pointer;
    margin-left: 40px;
    margin-top: 16px;
    align-items: center;

    /* 선택적으로 hover 효과 추가 */
    &:hover {
    background-color: #3530ED; /* hover 시의 배경색 변경 */
    }
`;