import React, { useState } from "react";
import styled from "styled-components";
import fix from "../../assets/flowwrite/fix_flow_write.png";
import deleteIcon from "../../assets/flowwrite/deleteIcon.png";

const keywordMapping = {
    COOPERATIVE: "협동",
    QUICKNESS: "순발력",
    SENSIBLE: "센스",
    BRAIN: "두뇌",
    CREATIVE: "창의력",
    ACTIVE: "액티브",
    PSYCHOLOGICAL: "심리",
    LUCK: "행운",
    COMMON_SENSE: "상식",
    PREPARATION: "준비물",
  };

export default function WriteSelectedRecreationInfo({ num, onDelete, title, selectedKeywords, time }) {
  const [editableTitle, setEditableTitle] = useState(title);

  const handleTitleChange = (e) => {
    setEditableTitle(e.target.value); // 제목 수정
  };

  const handleDeleteClick = () => {
    onDelete(num); // 삭제 기능
  };

  // 키워드를 한국어로 변환
  const translatedKeywords = selectedKeywords.map(keyword => keywordMapping[keyword] || keyword);

  return (
    <Container>
      <Line time={time}></Line>
      <InfoBox time={time}>
        <RecreationTitle>
          <Number>{num + 1}</Number>
          <RecreationTitleInput
            type="text"
            value={editableTitle}
            onChange={handleTitleChange}
            placeholder="레크레이션 제목 입력"
            style={{
              fontSize: "20px",
              fontWeight: "700",
              border: "none",
              outline: "none",
            }}
          />
          <img
            src={fix}
            alt="Fix"
            style={{ width: "24px", height: "24px", cursor: "pointer" }}
            onClick={handleDeleteClick}
          />
        </RecreationTitle>

        <KeywordBox>
          {selectedKeywords.length === 0 ? (
            <KeywordInput
              type="text"
              placeholder="이곳을 클릭하여 3개의 키워드를 선택해주세요."
              style={{
                width: "90%",
                height: "18px",
                backgroundColor: "#E9EBED",
              }}
            />
          ) : (
            <div style={{ width: "90%", display: "flex" }}>
              {translatedKeywords.map((keyword, index) => (
                <StyledKeyword key={index}>
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
              ))}
            </div>
          )}
        </KeywordBox>

        <PlayTime>
          <div style={{ fontSize: "16px", fontWeight: "500", color: "#1B1D1F" }}>
            플레이까지
          </div>
          <div style={{ fontSize: "16px", fontWeight: "600", color: "#1B1D1F" }}>
            {time} 분
          </div>
        </PlayTime>
      </InfoBox>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  gap: 8px;
  align-items: end;
  margin-bottom: 8px;
`;

const Line = styled.div`
  width: 0px;
  height: ${(props) => `${Math.max((props.time / 10) * 119.004, 119.004)}px`};
  border: 5px solid #b1beff;
  border-radius: 20px;
  margin-right: 21px;
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  top: ${(props) =>
    props.time === 10 ? "0" : `calc(-${props.time / 10 - 1} * 119.04px)`};
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

const Number = styled.div`
  width: 42px;
  height: 42px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #b1beff;
  border-radius: 50%;
  font-size: 24px;
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
`;

const StyledKeyword = styled.span`
  display: flex;
  height: 25px;
  padding: 2px 10px;
  border-radius: 20px;
  background: #d9d9d9;
  font-size: 16px;
  color: #1b1d1f;
  margin-left: 8px;
  align-items: center;
`;

// 삭제 키워드 함수 구현 필요
const handleDeleteKeyword = (index, event) => {
  // 구현 필요
};

const PlayTime = styled.div`
  display: flex;
  gap: 21px;
`;
