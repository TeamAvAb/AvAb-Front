import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import rechoice from '../../assets/flowwrite/rechoice.png';

const DetailKeywordModal = ({ onClose, onSelectDetailKeywords, selectedKeywords: propSelectedDetailKeywords }) => {
    console.log("Selected Keywords in DetailKeywordModal:", propSelectedDetailKeywords);
    const [detailSelectedKeywords, setDetailSelectedKeywords] = useState([]);
        
    useEffect(() => {
      setDetailSelectedKeywords(propSelectedDetailKeywords);
  }, [propSelectedDetailKeywords]);

  const keywordGroups = ['협동', '순발력', '센스', '두뇌', '창의력', '액티브', '심리', '행운', '상식', '준비물'];
  
  const handleKeywordClick = (keyword) => {
      if (detailSelectedKeywords.includes(keyword)) {
          setDetailSelectedKeywords(detailSelectedKeywords.filter((selected) => selected !== keyword));
      } else {
          setDetailSelectedKeywords([...detailSelectedKeywords, keyword]);
      }
  };


  const handleResetDetailKeywords = () => {
      // 선택된 키워드 리셋
      setDetailSelectedKeywords([]);
  };

  const handleSelectDetailKeywords = () => {
    console.log("Selected Keywords before update:", detailSelectedKeywords);
    onSelectDetailKeywords(detailSelectedKeywords);
    console.log("Selected Keywords after update:", detailSelectedKeywords);
    setDetailSelectedKeywords([]);
    onClose();
};

  return (
    <>
      <ModalOverlay onClick={onClose} />
      <ModalContent>
        <DetailKeywordWrap>
      {keywordGroups.map((keyword) => (
              <DetailKeywordButton key={keyword} onClick={() => handleKeywordClick(keyword)}>
                <DetailKeywordSpan clicked={detailSelectedKeywords.includes(keyword)}>{keyword}</DetailKeywordSpan>
              </DetailKeywordButton>
            ))}
            </DetailKeywordWrap>
        <BottomContainer>
        <CloseButton onClick={onClose}>
            닫기
          </CloseButton>
          <RechoiceButton onClick={handleResetDetailKeywords}>
          <img src={rechoice} alt="Rechoice" style={{ width: '42px', height: '42px' }} />
          초기화
          </RechoiceButton>
          <DetailKeywordSelectButton onClick={handleSelectDetailKeywords}>
            선택 완료
          </DetailKeywordSelectButton>
        </BottomContainer>
      </ModalContent>
    </>
  );
};

export default DetailKeywordModal;

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
  height: 288px;
  background-color: #FFF;
  border: 0.5px solid #CACDD2;
  border-radius: 20px;
  z-index: 1001; /* Ensure the modal is above the overlay */
`;

const DetailKeywordWrap = styled.div`
  padding-left: 49px;
  padding-top: 42px;
  padding-bottom: 22px;
`;

const DetailKeywordButton = styled.div`
  display: inline-block;
  margin-bottom: 20px;
`;

const DetailKeywordSpan = styled.span`
  display: inline-flex;
  padding: 10px 40px;
  border-radius: 5px;
  border: 1px solid #E9EBED;
  background-color: ${({ clicked }) => (clicked ? '#A0DDFF' : '#E9EBED')};
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

const DetailKeywordSelectButton = styled.button`
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