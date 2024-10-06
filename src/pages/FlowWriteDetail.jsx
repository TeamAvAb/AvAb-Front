import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import DetailKeywordModal from "../components/flowwrite/DetailKeywordModal.jsx";
import write1 from "../assets/flowwrite/write_1.png";
import writeSelect2 from "../assets/flowwrite/write_select_2.png";
import write3 from "../assets/flowwrite/write_3.png";
import write4 from "../assets/flowwrite/write_4.png";
import line from "../assets/flowwrite/line.png";
import check from "../assets/flowwrite/check.png";
import deleteIcon from "../assets/flowwrite/deleteIcon.png";

import imgGo3 from "../assets/flowwrite/ImgGo3.png";
import imgGo4 from "../assets/flowwrite/ImgGo4.png";

const DetailMappings = {
  협동: "COOPERATIVE",
  순발력: "QUICKNESS",
  센스: "SENSIBLE",
  두뇌: "BRAIN",
  창의력: "CREATIVE",
  액티브: "ACTIVE",
  심리: "PSYCHOLOGICAL",
  행운: "LUCK",
  상식: "COMMON_SENSE",
  준비물: "PREPARATION",
};

export default function FlowWriteDetail() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDetailKeywords, setSelectedDetailKeywords] = useState([]);
  const [selectedGenders, setSelectedGenders] = useState([]);
  const [selectedAges, setSelectedAges] = useState([]);
  const [selectedGroupSize, setSelectedGroupSize] = useState("");
  
  const ageGroups = [
    ["10대 미만", "UNDER_TEENAGER"],
    ["10대", "TEENAGER"],
    ["20대", "TWENTIES"],
    ["30대", "THIRTIES"],
    ["40대", "FORTIES"],
    ["50대 이상", "OVER_FIFTIES"],
  ];

  // 로컬 스토리지에 selectedDetailKeywords 상태를 저장
  useEffect(() => {
    localStorage.setItem(
      "selectedDetailKeywords",
      JSON.stringify(selectedDetailKeywords)
    );
  }, [selectedDetailKeywords]);

  const handleNextClick = () => {
    localStorage.setItem("selectedGenders", JSON.stringify(selectedGenders));
    localStorage.setItem("selectedAges", JSON.stringify(selectedAges));
    localStorage.setItem("selectedGroupSize", selectedGroupSize);
    const englishDetailKeywords = selectedDetailKeywords.map(
      (keyword) => DetailMappings[keyword]
    );
    localStorage.setItem(
      "selectedDetailKeywords",
      JSON.stringify(englishDetailKeywords)
    );
    console.log("Saved detail keywords:", englishDetailKeywords);
    navigate("/flow/write/recommend");
    window.scrollTo({ top: 0, behavior: "smooth" }); // 화면 스크롤 최상단으로 이동
  };

  const handleBeforeClick = () => {
    localStorage.removeItem("selectedGenders");
    localStorage.removeItem("selectedAges");
    localStorage.removeItem("selectedGroupSize");
    localStorage.removeItem("selectedDetailKeywords");
    navigate("/flow/write");
    window.scrollTo({ top: 0, behavior: "smooth" }); // 화면 스크롤 최상단으로 이동
  };

  const handleGo4Click = () => {
    navigate("/flow/write/content");
    window.scrollTo({ top: 0, behavior: "smooth" }); // 화면 스크롤 최상단으로 이동
  };

  const handleGenderClick = (gender) => {
    console.log(`Clicked gender button with value: ${gender}`);
    if (selectedGenders.includes(gender)) {
      // 성별이 이미 선택되었는지 확인
      setSelectedGenders(
        selectedGenders.filter((selected) => selected !== gender)
      );
    } else {
      // 클릭을 기반으로 선택한 성별 업데이트
      setSelectedGenders([...selectedGenders, gender]);
    }
  };

  const handleAgeClick = (age) => {
    console.log(`Clicked age button with value: ${age}`);

    // 연령대가 이미 선택되었는지 확인
    const isAgeSelected = selectedAges.includes(age);

    // 클릭을 기반으로 선택한 연령대 업데이트
    if (isAgeSelected) {
      setSelectedAges(
        selectedAges.filter((selectedAge) => selectedAge !== age)
      );
    } else {
      setSelectedAges([...selectedAges, age]);
    }
    // checkAllFields();
  };

  const handleGroupSizeChange = (event) => {
    setSelectedGroupSize(event.target.value);
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
    setSelectedDetailKeywords(keywords);
    handleCloseModal();
    setIsModalOpen(true);
  };

  const handleDeleteKeyword = (index, event) => {
    // Prevent the click event from propagating to the parent container (PurposeSearch)
    event.stopPropagation();

    const updatedKeywords = [...selectedDetailKeywords];
    updatedKeywords.splice(index, 1);
    setSelectedDetailKeywords(updatedKeywords);
  };

  return (
    <FlowWriteWrap>
      {isModalOpen && (
        <DetailKeywordModal
          onClose={handleCloseModal}
          onSelectDetailKeywords={handleSelectDetailKeywords}
          selectedKeywords={selectedDetailKeywords}
        />
      )}
      <ProgressbarStyle>
        <ProgressBarItem>
          <img
            src={write1}
            alt="Write 1"
            style={{ width: "50px", height: "50px" }}
          />
          <span>기본정보</span>
          <img src={line} alt="line" style={{ width: "80px", height: "2px" }} />
        </ProgressBarItem>
        <ProgressBarItem>
          <img
            src={writeSelect2}
            alt="Write Select 2"
            style={{ width: "50px", height: "50px" }}
          />
          <span style={{ color: "#19297C" }}>세부정보</span>
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
      <FlowwriteDetail>
        <div>
          <AdditionalExplain>
            <span>
              세부정보 입력은 필수사항은 아니지만, <strong>세부정보</strong>를
              입력할수록 <strong>정확한 추천</strong>을 얻을 수 있습니다.
            </span>
          </AdditionalExplain>
          <TextLine>원하는 키워드를 입력해주세요.</TextLine>
          <KeywordSearch onClick={handleDetailSearchClick}>
            <img
              src={check}
              alt="Check"
              style={{ width: "25px", height: "25px" }}
            />
            {selectedDetailKeywords.length === 0 ? (
              <KeywordInput
                type="text"
                placeholder="클릭하면 키워드 선택창이 나와요!"
                style={{ width: "90%", height: "18px" }}
              />
            ) : (
              <div style={{ width: "90%", display: "flex" }}>
                {selectedDetailKeywords.map((keyword, index) => (
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
                    {index !== selectedDetailKeywords.length - 1 && " "}
                  </React.Fragment>
                ))}
              </div>
            )}
          </KeywordSearch>
          <TextLine>
            레크레이션에 참여하는 인원의 성별과 연령대를 선택해주세요.
          </TextLine>
          <SubTextLine>성별</SubTextLine>
          <GenderButton
            clicked={selectedGenders.includes("FEMALE")}
            onClick={() => handleGenderClick("FEMALE")}
          >
            <span
              className={`genderBtn ${
                selectedGenders.includes("FEMALE") ? "clicked" : ""
              }`}
            >
              여성
            </span>
          </GenderButton>
          <GenderButton
            clicked={selectedGenders.includes("MALE")}
            onClick={() => handleGenderClick("MALE")}
          >
            <span
              className={`genderBtn ${
                selectedGenders.includes("MALE") ? "clicked" : ""
              }`}
            >
              남성
            </span>
          </GenderButton>
          <div>
            <SubTextLine>연령대</SubTextLine>
            {ageGroups.map((age) => (
              <AgeButton key={age[1]} onClick={() => handleAgeClick(age[1])}>
                <AgeSpan clicked={selectedAges.includes(age[1])}>
                  {age[0]}
                </AgeSpan>
              </AgeButton>
            ))}
          </div>
          <TextLine>레크레이션에 참여하는 조별 인원을 선택해주세요.</TextLine>
          <JoinPeople>
            <JoinPeopleInput
              type="text"
              placeholder="조별 인원을 입력해주세요."
              style={{ width: "90%", height: "18px" }}
              value={selectedGroupSize}
              onChange={handleGroupSizeChange}
            />
          </JoinPeople>
          <CardContainerWrapper>
            <CardContainer>
            <CardInteractionContainer>
              <CardGoRecommend onClick={handleNextClick}>
                <CardGoContainer>
                  <img
                    src={imgGo3}
                    alt="go 3"
                    style={{ width: "120px", height: "120px" }}
                  />
                  <CardGoTextContainer>
                    <CardGo3Text>추천 플로우 확인하기</CardGo3Text>
                    <CardGo3SubText>
                      입력한 정보를 바탕으로{"\n"}아브아브가 추천한 플로우예요!
                    </CardGo3SubText>
                  </CardGoTextContainer>
                </CardGoContainer>
              </CardGoRecommend>
              <CardGoContent onClick={handleGo4Click}>
                <CardGoContainer>
                  <CardGoTextContainer>
                    <CardGo4Text>바로 플로우 작성하기</CardGo4Text>
                    <CardGo4SubText>
                      원하는 플로우를 작성할 수 있도록{"\n"}아브아브가 도와줄게요!
                    </CardGo4SubText>
                  </CardGoTextContainer>
                  <img
                    src={imgGo4}
                    alt="go 4"
                    style={{ width: "120px", height: "120px" }}
                  />
                </CardGoContainer>
              </CardGoContent>
              </CardInteractionContainer>
            </CardContainer>
          </CardContainerWrapper>
          <LastButton onClick={handleBeforeClick}>이전으로</LastButton>
          <NextButton onClick={handleNextClick}>다음으로</NextButton>
        </div>
      </FlowwriteDetail>
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

const FlowwriteDetail = styled.div`
  width: 1356px;
  height: 1186px;
  background-color: #fff;
  border: 0.5px solid #cacdd2;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  margin-bottom: 45px;
`;

const AdditionalExplain = styled.div`
  width: 1130px;
  height: 47px;
  border-radius: 50px;
  border: none;
  background-color: #19297c;
  margin-left: 113px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
  margin-bottom: 100px;

  span {
    color: #fff;
    font-size: 16px;
    font-weight: 400;
  }

  strong {
    font-weight: 700;
  }
`;

const TextLine = styled.div`
  color: #000;
  font-size: 24px;
  line-height: 1.5;
  margin-left: 116px;
  margin-top: 40px;
  margin-bottom: 21px;
  font-weight: 700;
`;

const KeywordSearch = styled.div`
  width: 1130px;
  height: 63px;
  border-radius: 20px;
  border: 0.5px solid #9fa4a9;
  background: #fff;
  margin-left: 116px;
  display: flex;
  align-items: center;

  img {
    margin-left: 13px;
  }
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

const SubTextLine = styled.span`
  color: #464c52;
  font-size: 20px;
  margin-left: 116px;
  margin-right: 31px;
  font-weight: 700;
`;

const GenderButton = styled.span`
  width: 85px;
  height: 44px;
  border-radius: 50px;
  border: 0.5px solid #9fa4a9;
  background-color: ${({ clicked }) => (clicked ? "#B1BEFF" : "#fff")};
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  display: inline-block;
  margin-left: 21px;
  color: ${({ clicked }) => (clicked ? "#1B1D1F" : "#9FA4A9")};
  font-size: 20px;
  font-weight: 700;
  padding-top: 18px;
  padding-left: 45px;
  cursor: pointer;
`;

const AgeButton = styled.div`
  display: inline-block;
  margin-top: 21px;
`;

const AgeSpan = styled.span`
  display: inline-flex;
  padding: 19px 48px;
  border-radius: 50px;
  border: 0.5px solid #9fa4a9;
  background-color: ${({ clicked }) => (clicked ? "#B1BEFF" : "#fff")};
  justify-content: center;
  align-items: center;
  display: flex;
  margin-left: 21px;
  color: ${({ clicked }) => (clicked ? "#1B1D1F" : "#9FA4A9")};
  font-size: 20px;
  font-weight: 700;
  cursor: pointer;
`;

const JoinPeople = styled.div`
  width: 200px;
  height: 63px;
  border-radius: 20px;
  border: 0.5px solid #9fa4a9;
  background: #fff;
  margin-left: 116px;
  display: flex;
  align-items: center;
`;

const JoinPeopleInput = styled.input`
  width: 90%;
  height: 18px;
  margin-left: 16px;
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

const CardContainer = styled.div`
  display: flex;
  gap: 20px;
`;

const CardGoRecommend = styled.div`
  width: 502px;
  height: 129px;
  padding: 40px 25px;
  border-radius: 20px;
  border: none;
  background: #a0ddff;
  margin-top: 40px;
  align-items: center;
  transition: box-shadow 0.3s ease, transform 0.3s ease; /* 부드러운 전환 효과 추가 */
  position: relative; 

  &:hover {
    box-shadow: 0px 0px 20px 0px rgba(27, 29, 31, 0.15); /* 호버 시 그림자 효과 */
    width: calc(502px + 118px); /* 너비 증가 */
  }
`;

const CardGoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CardGoTextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const CardGo3Text = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: #000;
  text-align: left;
  margin-bottom: 8px;
  margin-left: 42px;
`;

const CardGo3SubText = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: #000;
  text-align: left;
  white-space: pre-line;
  margin-left: 42px;
`;

const CardGoContent = styled.div`
  width: 502px;
  height: 129px;
  padding: 40px 25px;
  border-radius: 20px;
  border: none;
  background: #ffaa29;
  margin-top: 40px;
  align-items: center;
  transition: box-shadow 0.3s ease, transform 0.3s ease; /* 부드러운 전환 효과 추가 */
  position: relative; 

  &:hover {
    box-shadow: 0px 0px 20px 0px rgba(27, 29, 31, 0.15); /* 호버 시 그림자 효과 */
    width: calc(502px + 118px); /* 너비 증가 */
  }
`;

const CardGo4Text = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: #000;
  text-align: right;
  margin-bottom: 8px;
  margin-right: 42px;
`;

const CardGo4SubText = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: #000;
  text-align: right;
  white-space: pre-line;
  margin-right: 42px;
`;

const CardContainerWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

// 상호작용 설정
const CardInteractionContainer = styled.div`
  display: flex;
  gap: 20px;

  ${CardGoRecommend}:hover + ${CardGoContent} {
    width: calc(502px - 118px); /* Recommend 카드 호버 시 Content 카드 너비 감소 */
  }

  ${CardGoContent}:hover + ${CardGoRecommend} {
    width: calc(502px - 118px); /* Content 카드 호버 시 Recommend 카드 너비 감소 */
  }
`;

const LastButton = styled.button`
  width: 138px;
  height: 54px;
  color: #464c52;
  background-color: #fff;
  border: 1px solid #464c52;
  border-radius: 50px;
  font-size: 19px;
  font-weight: 700;
  cursor: pointer;
  margin-left: 510px;
  margin-top: 121px;

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
