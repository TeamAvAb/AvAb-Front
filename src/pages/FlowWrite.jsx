import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import KeywordModal from '../components/main/KeywordModal.jsx';
import writeSelect1 from "../assets/flowwrite/write_select_1.png";
import write2 from "../assets/flowwrite/write_2.png";
import write3 from "../assets/flowwrite/write_3.png";
import write4 from "../assets/flowwrite/write_4.png";
import line from "../assets/flowwrite/line.png";
import KEYWORD_CATEGORY from '../constants/searchKeywordCategory.js';
import PURPOSE from '../constants/enum/purpose.js';
import keywordImg from '../assets/main/checkIcon.svg';
import deleteImg from '../assets/main/deleteIcon.svg';
import warn from "../assets/flowwrite/warn.png";
import { Helmet } from "react-helmet";

const keywordMappings = {
  워크샵: "WORKSHOP",
  체육대회: "SPORTS_DAY",
  MT: "MT",
  모임: "GATHERING",
  수련회: "RETREAT",
};

export default function FlowWrite({initialParams = {} }) {
  const getInitialPurpose = (purposes) => {
    if (!purposes) {
      return [];
    }

    if (Array.isArray(purposes)) {
      return purposes.map((purpose) => PURPOSE[purpose]).filter((v) => v);
    }

    return [PURPOSE[purposes]].filter((v) => v);
  };

  const params = {
    purpose: getInitialPurpose(initialParams.purpose),
  };

  useEffect(() => {
    console.log("현재 선택된 목적 키워드:", purpose);
    localStorage.setItem("purpose", JSON.stringify(params.purpose));
  }, [params.purpose]);

  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const [keyword, setKeyword] = useState(params.keyword);
  const [keywordContent, setKeywordContent] = useState([]);
  const [playTime, setPlayTime] = useState("");
  const [purpose, setPurpose] = useState(params.purpose);
  const [savedPlayTime, setSavedPlayTime] = useState(null);
  const [showWarning, setShowWarning] = useState(false);
  const [purposeModal, setPurposeModal] = useState(false);

  const renderKeyword = (category, selected) => {
    return selected.map((el) => (
      <SelectedKeyword key={el.key}>
        <span>{el.value} 포함</span>
        <img
          alt={`${el.value} 삭제`}
          src={deleteImg}
          id={el}
          style={{ width: '1rem' }}
          onClick={(e) => {
            e.stopPropagation();
            handleRemoveClick(category, el);
          }}
        />
      </SelectedKeyword>
    ));
  };

  useEffect(() => {
    const savedTime = localStorage.getItem("playTime");
    const savedPurpose = localStorage.getItem("selectedPurpose");
    if (savedPurpose) {
      setPurpose(JSON.parse(savedPurpose)); // 저장된 목적 키워드를 불러와 상태에 반영
    }

    if (savedTime) {
      setSavedPlayTime(savedTime);
      setPlayTime(savedTime);
    }
  }, []);

  const handleNextClick = () => {
    console.log("현재 선택된 목적:", purpose);
    if (!purpose.length) {
      setShowWarning("레크레이션 목적을 선택해주세요.");
      return;
    }
  
    if (!playTime) {
      setShowWarning("시간을 10분 단위로 입력해주세요.");
      return;
    }
  
    if (parseInt(playTime, 10) % 10 !== 0) {
      setShowWarning("시간을 10분 단위로 입력해주세요.");
      return;
    }
  
    const englishKeywords = selectedKeywords.map(
      (keyword) => keywordMappings[keyword]
    );
    localStorage.setItem("selectedKeywords", JSON.stringify(englishKeywords));
    localStorage.setItem("playTime", playTime);
    setSavedPlayTime(playTime);
    navigate("/flow/write/detail");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBeforeClick = () => {
    localStorage.removeItem("selectedKeywords");
    localStorage.removeItem("playTime");
    localStorage.removeItem("selectedGenders");
    localStorage.removeItem("selectedAges");
    localStorage.removeItem("selectedGroupSize");
    localStorage.removeItem("selectedDetailKeywords");
    localStorage.removeItem("selectedFlow");
    navigate("/flow/my");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  
  const handleRemoveClick = (category, targetValue) => {
    if (category === KEYWORD_CATEGORY.KEYWORD) {
      setKeyword(keyword.filter((el) => el.key !== targetValue.key));
    } else {
      setPurpose(purpose.filter((el) => el.key !== targetValue.key));
    }
  };

  return (
    <FlowWriteWrap>
      <Helmet>
        <title>AvAb | 레크레이션 플로우 작성</title>
        <meta
          name="description"
          content="레크레이션 플로우를 작성하고 개인 맞춤형 레크레이션 계획을 쉽게 만들 수 있는 페이지입니다."
        />
        <meta
          name="keywords"
          content="레크레이션, 플로우 작성, 아브아브, AvAb"
        />
      </Helmet>
      {purposeModal ? (
        <KeywordModal
          category={KEYWORD_CATEGORY.PURPOSE}
          content={Object.values(PURPOSE)}
          modalControl={setPurposeModal}
          keywordControl={setPurpose}
          selectedOption={purpose}
        />
      ) : null}
      <ProgressbarStyle>
        <ProgressBarItem>
          <img src={writeSelect1} alt="Write Select 1" style={{ width: "50px", height: "50px" }} />
          <span style={{ color: "#19297C" }}>기본정보</span>
          <img src={line} alt="line" style={{ width: "80px", height: "2px" }} />
        </ProgressBarItem>
        <ProgressBarItem>
          <img src={write2} alt="Write 2" style={{ width: "50px", height: "50px" }} />
          <span>세부정보</span>
          <img src={line} alt="line" style={{ width: "80px", height: "2px" }} />
        </ProgressBarItem>
        <ProgressBarItem>
          <img src={write3} alt="Write 3" style={{ width: "50px", height: "50px" }} />
          <span>추천 플로우</span>
          <img src={line} alt="line" style={{ width: "80px", height: "2px" }} />
        </ProgressBarItem>
        <ProgressBarItem>
          <img src={write4} alt="Write 4" style={{ width: "50px", height: "50px" }} />
          <span>플로우 내용</span>
        </ProgressBarItem>
      </ProgressbarStyle>
      <FlowwriteBasic>
        <div>
          <TextLine>레크레이션의 목적을 입력해주세요.</TextLine>
          <PurposeSearch 
            id="purpose"
            onClick={() => {
              console.log("클릭됨!");
              setPurposeModal(true);
            }}>
              <img src={keywordImg} style={{ width: '1.2rem', paddingLeft: '1.4rem' }} alt="" />
              {purpose.length === 0 ? (
                '클릭하면 목적 선택창이 나와요!'
              ) : (
                <SelectedKeywords>
                  {renderKeyword(KEYWORD_CATEGORY.PURPOSE, purpose)}
                </SelectedKeywords>
              )}
            </PurposeSearch>
          <TextLine>레크레이션의 총 진행 시간을 입력해주세요.</TextLine>
          <PlayTime>
            <PlayInput
              type="text"
              placeholder="시간을 10분 단위로 입력해주세요."
              style={{ width: "90%", height: "18px" }}
              value={playTime}
              onChange={(e) => setPlayTime(e.target.value)}
            />
          </PlayTime>
          <OutButton onClick={handleBeforeClick}>페이지 나가기</OutButton>
          <NextButton onClick={handleNextClick}>
            다음으로
            {showWarning && (
            <WarningWrapper>
              <WarningBox>
                <WarningIcon src={warn} alt="Warning" />
                {showWarning}
              </WarningBox>
            </WarningWrapper>
          )}
            </NextButton>
        </div>
      </FlowwriteBasic>
    </FlowWriteWrap>
  );
}

const FlowWriteWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background-color: #f7f8f9;
`;

const ProgressbarStyle = styled.div`
  width: 84.75rem;
  height: 9.75rem;
  background-color: #fff;
  border: 0.03125rem solid #cacdd2;
  border-radius: 1.25rem;
  display: flex;
  margin-bottom: 2.0625rem;
  justify-content: center;
  align-items: center;
  margin-top: 2.375rem;
`;

const ProgressBarItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  img {
    margin-right: 0.625rem;
    margin-left: 0.625rem;
  }

  span {
    color: #cacdd2;
    font-size: 1.5rem;
    font-weight: 700;
  }
`;

const FlowwriteBasic = styled.div`
  width: 84.75rem;
  height: 28.125rem;
  background-color: #fff;
  border: 0.03125rem solid #cacdd2;
  border-radius: 1.25rem;
  display: flex;
  flex-direction: column;
  margin-bottom: 2.8125rem;
`;

const TextLine = styled.div`
  color: #000;
  font-size: 1.5rem;
  line-height: 1.5;
  margin-left: 7.25rem;
  margin-top: 2.5rem;
  margin-bottom: 1.3125rem;
  font-weight: 700;
`;

const KeywordBox = styled.div`
  flex: 1;
  height: 3rem;
  border-radius: 9999px;
  padding-right: 1rem;
  background: ${({ theme }) => theme.color.main05};
  color: ${({ theme }) => theme.color.grayscale04};
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  align-items: center;
  padding-left: 1.4rem;
  cursor: pointer;
  width: 100%;
  overflow: hidden;
`;

const SelectedKeywords = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  overflow-x: auto;
  white-space: nowrap;
  width: 100%;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const SelectedKeyword = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.125rem 0.5rem;
  gap: 0.5rem;
  border-radius: 9999px;
  background: #d9d9d9;
  color: ${({ theme }) => theme.color.grayscale01};
`;

const PurposeSearch = styled.div`
  width: 70%;
  height: 4rem;
  border-radius: 1.25rem;
  border: 0.03125rem solid #9fa4a9;
  background: ${({ theme }) => theme.color.main05};
  color: ${({ theme }) => theme.color.grayscale04};
  margin-left: 7.25rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  overflow: hidden;
  cursor: pointer;
`;

const PurposeInput = styled.input`
  width: 90%;
  height: 1.125rem;
  margin-left: 0.5rem;
  border: none;
  outline: none;
  font-size: 1rem;

  &::placeholder {
    color: #9fa4a9;
  }

  &:focus::placeholder {
    color: transparent;
  }
`;

const StyledKeyword = styled.span`
  display: flex;
  height: 1.5625rem;
  padding: 0.125rem 0.625rem;
  border-radius: 1.25rem;
  background: #d9d9d9;
  font-size: 1rem;
  color: #1b1d1f;
  margin-left: 0.5rem;
  align-items: center;

  img {
    margin-left: 0.75rem;
  }
`;

const PlayTime = styled.div`
  width: 20%;
  height: 3.9375rem;
  border-radius: 1.25rem;
  border: 0.03125rem solid #9fa4a9;
  background: ${({ theme }) => theme.color.main05};
  color: ${({ theme }) => theme.color.grayscale04};
  margin-left: 7.25rem;
  display: flex;
  align-items: center;
`;

const PlayInput = styled.input`
  width: 90%;
  height: 4rem;
  padding-left: 1.4rem;
  border: none;
  outline: none;
  font-size: 1rem;

  &::placeholder {
    color: #9fa4a9;
  }

  &:focus::placeholder {
    color: transparent;
  }
`;

const WarningWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 0.625rem;
`;

const WarningBox = styled.div`
  width: 20rem;
  padding: 1.4375rem;
  background-color: #464c52;
  color: #ffaa29;
  border-radius: 1.25rem;
  font-size: 1.25rem;
  font-weight: 400;
  position: absolute;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 4.375rem;

  &::after {
  content: '';
  position: absolute;
  bottom: -1.125rem;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 0.625rem solid transparent;
  border-right: 0.625rem solid transparent;
  border-top: 1.25rem solid #464c52;
}
`;

const WarningIcon = styled.img`
  width: 1rem;
  height: 0.875rem;
  margin-right: 0.5rem;
`;

const OutButton = styled.button`
  width: 11.0625rem;
  height: 3.375rem;
  color: #464c52;
  background-color: #fff;
  border: 0.0625rem solid #464c52;
  border-radius: 3.125rem;
  font-size: 1.1875rem;
  font-weight: 700;
  cursor: pointer;
  margin-left: 30.625rem;
  margin-top: 2.1875rem;
`;

const NextButton = styled.button`
  width: 8.625rem;
  height: 3.375rem;
  background-color: #4036ed;
  border: none;
  border-radius: 3.125rem;
  font-size: 1.1875rem;
  font-weight: 700;
  color: #fff;
  cursor: pointer;
  margin-left: 3.75rem;
  position: relative;
`;
