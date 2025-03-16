import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import fix from '../../assets/flowwrite/fix_flow_write.png';
import deleteIcon from '../../assets/common/deleteIcon.svg';
import warn from '../../assets/flowwrite/warn.png';
import DetailKeywordModal from '../flowwrite/DetailKeywordModal';

export default function WriteRecreationInfo({
  num,
  title,
  keywords,
  playTime,
  isEditable,
  onDelete,
}) {
  const [localTitle, setLocalTitle] = useState(title || '');
  const [localTime, setLocalTime] = useState(playTime || 10);
  const [localKeywords, setLocalKeywords] = useState(keywords || []);
  const [isWarningVisible, setIsWarningVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedKeywords, setSelectedKeywords] = useState([]);

  const keywordMapping = {
    COOPERATIVE: '협동',
    QUICKNESS: '순발력',
    SENSIBLE: '센스',
    BRAIN: '두뇌',
    CREATIVE: '창의력',
    ACTIVE: '액티브',
    PSYCHOLOGICAL: '심리',
    LUCK: '행운',
    COMMON_SENSE: '상식',
    PREPARATION: '준비물',
  };

  const handleTitleChange = (e) => {
    if (isEditable || !title) {
      // isEditable이 true일 때만, 또는 title이 없을 때
      console.log('Title changed:', e.target.value); // 입력값 확인
      setLocalTitle(e.target.value); // 사용자가 수정할 수 있도록
    }
  };

  const handleTimeChange = (e) => {
    if (isEditable || !playTime) {
      // isEditable이 true일 때만, 또는 playTime이 없을 때
      console.log('Time changed:', e.target.value); // 입력값 확인
      setLocalTime(e.target.value); // 사용자가 수정할 수 있도록
    }
  };

  useEffect(() => {
    // 데이터가 없다면 기본값으로 설정하고, 이 경우에도 편집 가능하도록 설정
    if (!title) setLocalTitle('');
    if (!playTime) setLocalTime(10);
    if (!keywords) setLocalKeywords([]);
  }, [title, playTime, keywords]);

  const confirmDelete = () => {
    onDelete(num);
    setIsWarningVisible(false); // 경고창 닫기
  };

  const handleDeleteClick = () => {
    setIsWarningVisible(true); // 경고창 표시
  };

  const cancelDelete = () => {
    setIsWarningVisible(false); // 경고창 닫기
  };

  const handleDetailSearchClick = () => {
    if (!isModalOpen) {
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSelectDetailKeywords = (keywords) => {
    setSelectedKeywords(keywords);
    handleCloseModal();
    setIsModalOpen(true);
  };

  const handleDeleteKeyword = (index, event) => {
    event.stopPropagation();
    const updatedKeywords = [...selectedKeywords];
    updatedKeywords.splice(index, 1);
    setSelectedKeywords(updatedKeywords);
  };

  return (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'end', marginBottom: '8px' }}>
      {isModalOpen && (
        <DetailKeywordModal
          onClose={handleCloseModal}
          onSelectDetailKeywords={handleSelectDetailKeywords}
          selectedKeywords={selectedKeywords}
        />
      )}

      {isWarningVisible && (
        <WarningBox>
          <WarningIcon src={warn} alt="Warning" />
          <div style={{ textAlign: 'center', lineHeight: '1.5' }}>
            삭제하시겠습니까?
            <br />
            작업을 되돌릴 수 없습니다.
          </div>
          <WarningButtons>
            <WarningButton
              onClick={confirmDelete}
              style={{ backgroundColor: '#ffaa29', color: '#fff' }}
            >
              확인
            </WarningButton>
            <WarningButton
              onClick={cancelDelete}
              style={{ backgroundColor: '#6c757d', color: '#fff' }}
            >
              취소
            </WarningButton>
          </WarningButtons>
        </WarningBox>
      )}

      <Line time={localTime}></Line>
      <InfoBox time={localTime}>
        <RecreationTitle>
          <Number>{num + 1}</Number>
          <RecreationTitleInput
            type="text"
            value={localTitle}
            onChange={handleTitleChange}
            placeholder="레크레이션 제목 입력"
            style={{
              fontSize: '20px',
              fontStyle: 'normal',
              fontWeight: '700',
              border: 'none',
              outline: 'none',
            }}
            disabled={!(isEditable || !title)} // title이 없으면 입력 가능
          />
          <img
            src={fix}
            alt="Fix"
            style={{ width: '24px', height: '24px', cursor: 'pointer' }}
            onClick={handleDeleteClick}
          />
        </RecreationTitle>

        <KeywordBox onClick={handleDetailSearchClick}>
          {selectedKeywords.length === 0 ? (
            isEditable || !keywords ? (
              <KeywordInput
                type="text"
                placeholder="이곳을 클릭하여 3개의 키워드를 선택해주세요."
                style={{
                  width: '90%',
                  height: '18px',
                  backgroundColor: '#E9EBED',
                }}
                disabled={!(isEditable || !keywords)} // keywords가 없으면 입력 가능
              />
            ) : (
              // API에서 키워드를 받아올 때
              <div style={{ display: 'flex', gap: '8px', width: '90%' }}>
                {keywords.map((keyword, index) => (
                  <StyledKeyword key={index}>{keywordMapping[keyword] || keyword}</StyledKeyword>
                ))}
              </div>
            )
          ) : (
            <div style={{ width: '90%', display: 'flex' }}>
              {selectedKeywords.map((keyword, index) => (
                <React.Fragment key={index}>
                  <StyledKeyword>
                    {keyword}
                    <img
                      src={deleteIcon}
                      alt="Delete"
                      style={{
                        width: '20px',
                        height: '20px',
                        marginLeft: '5px',
                        cursor: 'pointer',
                        position: 'absolute', // 삭제 아이콘을 절대 위치로 설정
                        right: '-10px', // 오른쪽 끝에 위치
                        top: '50%', // 수직 가운데 정렬
                        transform: 'translateY(-50%)', // 정확한 가운데 정렬
                      }}
                      onClick={(e) => handleDeleteKeyword(index, e)}
                    />
                  </StyledKeyword>
                  {index !== selectedKeywords.length - 1 && ' '}
                </React.Fragment>
              ))}
            </div>
          )}
        </KeywordBox>

        <PlayTime>
          <div style={{ fontSize: '16px', fontWeight: '500', color: '#1B1D1F' }}>플레이까지</div>
          <div style={{ fontSize: '16px', fontWeight: '600', color: '#1B1D1F' }}>
            <PlayTimeInput
              type="text"
              value={localTime}
              onChange={handleTimeChange}
              onFocus={() => setLocalTime('')} // 입력창에 포커스가 가면 기존 값 지우기
              onBlur={() => {
                if (localTime === '') {
                  setLocalTime(10); // 입력창을 벗어날 때 값이 비어 있으면 기본값 10으로 설정
                }
              }}
              style={{
                fontSize: '16px',
                fontStyle: 'normal',
                fontWeight: '600',
                color: '#9FA4A9',
                border: 'none',
                outline: 'none',
                textAlign: 'right',
              }}
              disabled={!(isEditable || !playTime)} // playTime이 없으면 입력 가능
            />
            분
          </div>
        </PlayTime>
      </InfoBox>
    </div>
  );
}

const WarningBox = styled.div`
  width: 290px;
  padding: 20px;
  margin-left: 124px;
  background-color: #464c52;
  color: #ffaa29;
  border-radius: 20px;
  font-size: 20px;
  font-weight: 400;
  position: absolute;
  left: 50%;
  transform: translateX(50%); /* 수평 중앙 정렬 */
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;

  &::after {
    content: '';
    position: absolute;
    bottom: -18px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 20px solid #464c52;
  }
`;

const WarningIcon = styled.img`
  width: 16px;
  height: 14px;
  margin-bottom: 8px;
`;

const WarningButtons = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

const WarningButton = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
`;

const Line = styled.div`
  width: 0px;
  height: ${(props) => `${Math.max((props.time / 10) * 119.004, 119.004)}px`};
  border: 5px solid #b1beff;
  border-radius: 20px;
  margin-right: 21px;

  /*transition: height 0.5s cubic-bezier(0.4, 0, 0.2, 1);*/
  // 이상해짐
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  top: ${(props) => (props.time === 10 ? '0' : `calc(-${props.time / 10 - 1} * 119.04px)`)};
  min-height: 119.004px;
`;

const RecreationTitle = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
`;

const RecreationTitleInput = styled.input`
  &::placeholder {
    color: #9fa4a9;
  }

  &:focus::placeholder {
    color: transparent;
  }
`;

const PlayTimeInput = styled.input`
  width: 30px;
  &::placeholder {
    color: #9fa4a9;
  }

  &:focus::placeholder {
    color: transparent;
  }
`;

const Number = styled.div`
  width: 42px;
  height: 42px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #b1beff;
  border-radius: 50%;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  margin-right: 8px;
`;

const KeywordBox = styled.div`
  width: 371px;
  height: 37px;
  border-radius: 5px;
  background: #e9ebed;
  color: #9fa4a9;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
  margin-bottom: 15px;
  padding-left: 10px;
  box-sizing: border-box;
`;

const KeywordInput = styled.input`
  width: 90%;
  height: 18px;
  margin-left: 8px;
  border: none;
  outline: none;
  font-size: 16px;

  &::placeholder {
    color: #9fa4a9;
  }

  &:focus::placeholder {
    color: transparent;
  }

  /* 비활성화 상태일 때의 스타일 */
  ${({ disabled }) =>
    disabled &&
    `
    background-color: #E9EBED;
    color: #9fa4a9;
    cursor: not-allowed;
  `}
`;

const StyledKeyword = styled.span`
  display: flex;
  height: 25px;
  padding: 2px 10px;
  box-sizing: border-box;
  border-radius: 20px;
  background: #d9d9d9;
  font-size: 16px;
  color: #1b1d1f;
  margin-left: 8px;
  align-items: center;
  position: relative;

  img {
    margin-left: 12px;
  }
`;

const PlayTime = styled.div`
  display: flex;
  gap: 21px;
`;
