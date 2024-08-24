import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import WriteKeywordModal from "../components/flowwrite/WriteKeywordModal.jsx";
import writeSelect1 from "../assets/flowwrite/write_select_1.png";
import write2 from "../assets/flowwrite/write_2.png";
import write3 from "../assets/flowwrite/write_3.png";
import write4 from "../assets/flowwrite/write_4.png";
import line from "../assets/flowwrite/line.png";
import check from "../assets/flowwrite/check.png";
import deleteIcon from "../assets/flowwrite/deleteIcon.png";
import { Helmet } from "react-helmet";

const keywordMappings = {
  워크샵: "WORKSHOP",
  체육대회: "SPORTS_DAY",
  MT: "MT",
  모임: "GATHERING",
  수련회: "RETREAT",
};

export default function FlowWrite() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const [playTime, setPlayTime] = useState("");

  useEffect(() => {
    // 페이지가 로드될 때 localStorage에서 playTime을 가져와서 상태를 설정합니다.
    const savedPlayTime = localStorage.getItem("playTime");
    if (savedPlayTime) {
      setPlayTime(savedPlayTime);
    }
  }, []);

  // useEffect(() => {
  //   // 페이지가 로드될 때 localStorage에서 selectedKeywords을 가져와서 상태를 설정합니다.
  //   const savedSelectedKeywords = localStorage.getItem('selectedKeywords');
  //   if (savedSelectedKeywords) {
  //     setSelectedKeywords(savedSelectedKeywords);
  //   }
  // }, []);

  const handleNextClick = () => {
    const englishKeywords = selectedKeywords.map(
      (keyword) => keywordMappings[keyword]
    );
    localStorage.setItem("selectedKeywords", JSON.stringify(englishKeywords));
    localStorage.setItem("playTime", playTime);
    console.log("Saved keywords:", englishKeywords);
    console.log("Saved play time:", playTime);
    navigate("/flow/write/detail");
    window.scrollTo({ top: 0, behavior: "smooth" });
    console.log("Selected keywords for API:", englishKeywords);
  };

  const handleBeforeClick = () => {
    localStorage.removeItem("selectedKeywords");
    localStorage.removeItem("playTime");
    localStorage.removeItem("selectedGenders");
    localStorage.removeItem("selectedAges");
    localStorage.removeItem("selectedGroupSize");
    localStorage.removeItem("selectedDetailKeywords");
    navigate("/flow/my");
    window.scrollTo({ top: 0, behavior: "smooth" }); // 화면 스크롤 최상단으로 이동
  };

  const handlePurposeSearchClick = () => {
    if (!isModalOpen) {
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSelectKeywords = (keywords) => {
    setSelectedKeywords(keywords);
    console.log("Selected keywords:", keywords);
    handleCloseModal();
    setIsModalOpen(true);
  };

  const handleDeleteKeyword = (index, event) => {
    // Prevent the click event from propagating to the parent container (PurposeSearch)
    event.stopPropagation();

    const updatedKeywords = [...selectedKeywords];
    updatedKeywords.splice(index, 1);
    setSelectedKeywords(updatedKeywords);
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
      {isModalOpen && (
        <WriteKeywordModal
          onClose={handleCloseModal}
          onSelectKeywords={handleSelectKeywords}
          selectedKeywords={selectedKeywords}
        />
      )}
      <ProgressbarStyle>
        <ProgressBarItem>
          <img
            src={writeSelect1}
            alt="Write Select 1"
            style={{ width: "50px", height: "50px" }}
          />
          <span style={{ color: "#19297C" }}>기본정보</span>
          <img src={line} alt="line" style={{ width: "80px", height: "2px" }} />
        </ProgressBarItem>
        <ProgressBarItem>
          <img
            src={write2}
            alt="Write 2"
            style={{ width: "50px", height: "50px" }}
          />
          <span>세부정보</span>
          <img src={line} alt="line" style={{ width: "80px", height: "2px" }} />
        </ProgressBarItem>
        <ProgressBarItem>
          <img
            src={write3}
            alt="Write 3"
            style={{ width: "50px", height: "50px" }}
          />
          <span>추천 플로우</span>
          <img src={line} alt="line" style={{ width: "80px", height: "2px" }} />
        </ProgressBarItem>
        <ProgressBarItem>
          <img
            src={write4}
            alt="Write 4"
            style={{ width: "50px", height: "50px" }}
          />
          <span>플로우 내용</span>
        </ProgressBarItem>
      </ProgressbarStyle>
      <FlowwriteBasic>
        <div>
          <TextLine>레크레이션의 목적을 입력해주세요.</TextLine>
          <PurposeSearch onClick={handlePurposeSearchClick}>
            <img
              src={check}
              alt="Check"
              style={{ width: "25px", height: "25px" }}
            />
            {selectedKeywords.length === 0 ? (
              <PurposeInput
                type="text"
                placeholder="클릭하면 목적 선택창이 나와요!"
                style={{ width: "90%", height: "18px" }}
              />
            ) : (
              <div style={{ width: "90%", display: "flex" }}>
                {selectedKeywords.map((keyword, index) => (
                  <React.Fragment key={index}>
                    <StyledKeyword>
                      {keyword}
                      <img
                        src={deleteIcon}
                        alt="Delete"
                        style={{
                          width: "20px",
                          height: "20px",
                          marginLeft: "5px",
                          cursor: "pointer",
                        }}
                        onClick={(event) => handleDeleteKeyword(index, event)}
                      />
                    </StyledKeyword>
                    {index !== selectedKeywords.length - 1 && " "}
                  </React.Fragment>
                ))}
              </div>
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
          <NextButton onClick={handleNextClick}>다음으로</NextButton>
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
  width: 1356px;
  height: 156px;
  background-color: #fff;
  border: 0.5px solid #cacdd2;
  border-radius: 20px;
  display: flex;
  margin-bottom: 33px;
  justify-content: center;
  align-items: center;
  margin-top: 38px;
`;

const ProgressBarItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  img {
    margin-right: 10px;
    margin-left: 10px;
  }

  span {
    color: #cacdd2;
    font-size: 24px;
    font-weight: 700;
  }
`;

const FlowwriteBasic = styled.div`
  width: 1356px;
  height: 450px;
  background-color: #fff;
  border: 0.5px solid #cacdd2;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  margin-bottom: 45px;
`;

const TextLine = styled.div`
  color: #000;
  font-size: 24px;
  line-height: 1.5; /* 추가: 줄 간격 조절 */
  margin-left: 116px;
  margin-top: 40px;
  margin-bottom: 21px;
  font-weight: 700;
`;

const PurposeSearch = styled.div`
  width: 808px;
  height: 63px;
  border-radius: 20px;
  border: 0.5px solid #9fa4a9;
  background: #fff;
  margin-left: 116px;
  display: flex;
  align-items: center;

  img {
    margin-left: 20px;
  }
`;

const PurposeInput = styled.input`
  width: 90%;
  height: 18px;
  margin-left: 8px;
  border: none;
  outline: none;
  font-size: 16px;
  align-items: center;

  &::placeholder {
    color: #9fa4a9;
  }

  &:focus::placeholder {
    color: transparent;
  }
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

  img {
    margin-left: 12px;
  }
`;

const PlayTime = styled.div`
  width: 283px;
  height: 63px;
  border-radius: 20px;
  border: 0.5px solid #9fa4a9;
  background: #fff;
  margin-left: 116px;
  display: flex;
  align-items: center;
`;

const PlayInput = styled.input`
  width: 90%;
  height: 18px;
  margin-left: 15px;
  border: none;
  outline: none;
  font-size: 16px;

  &::placeholder {
    color: #9fa4a9;
  }

  &:focus::placeholder {
    color: transparent;
  }
`;

const OutButton = styled.button`
  width: 177px;
  height: 54px;
  color: #464c52;
  background-color: #fff;
  border: 1px solid #464c52;
  border-radius: 50px;
  font-size: 19px;
  font-weight: 700;
  cursor: pointer;
  margin-left: 490px;
  margin-top: 35px;

  /* 선택적으로 hover 효과 추가 */
  &:hover {
    background-color: #f7f8f9; /* hover 시의 배경색 변경 */
  }
`;

const NextButton = styled.button`
  width: 138px;
  height: 54px;
  background-color: #4036ed;
  border: none;
  border-radius: 50px;
  font-size: 19px;
  font-weight: 700;
  color: #fff;
  cursor: pointer;
  margin-left: 60px;

  /* 선택적으로 hover 효과 추가 */
  &:hover {
    background-color: #3530ed; /* hover 시의 배경색 변경 */
  }
`;
