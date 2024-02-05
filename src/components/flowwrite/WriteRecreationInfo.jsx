import React, { useState } from "react";
import styled from "styled-components";
import fix from "../../assets/flowwrite/fix_flow_write.png";

export default function WriteRecreationInfo({ num }) {
    const [title, setTitle] = useState("");
    const [time, setTime] = useState(10);

  const handleTitleChange = (e) => {
    // 사용자 입력이 변경될 때마다 title 상태 업데이트
    setTitle(e.target.value);
  };

  const handleTimeChange = (e) => {
    // 사용자 입력이 변경될 때마다 time 상태 업데이트
    setTime(e.target.value);
  };

  return (
    <div style={{ display: "flex", gap: "8px", alignItems: "end",marginBottom:'8px'}}>
      <Line time={time}></Line>
      <InfoBox time={time}>
        {/* 레크레이션 제목 */}
        <RecreationTitle>
          <Number>{num}</Number>
          <RecreationTitleInput
            type="text"
            value={title}
            onChange={handleTitleChange}
            placeholder="레크레이션 제목 입력"
            style={{ fontSize: "20px", fontStyle: "normal", fontWeight: "700", border: "none", outline: "none" }}
          />
          <img src={fix} alt="Fix" style={{ width: '24px', height: '24px' }} />
        </RecreationTitle>
        
        {/* 레크레이션 키워드 */}
        <KeywordBox>
          <Keyword>키워드 1</Keyword>
          <Keyword>키워드 2</Keyword>
          <Keyword>키워드 3</Keyword>
        </KeywordBox>

        {/* 레크레이션 소요 시간 */}
        <PlayTime>
          <div style={{ fontSize: "16px", fontStyle: "normal", fontWeight: "400", color: "#9FA4A9" }}>플레이까지</div>
          <div style={{ fontSize: "16px", fontStyle: "normal", fontWeight: "600", color: "#9FA4A9"}}>
          <PlayTimeInput
            type="text"
            value={time}
            onChange={handleTimeChange}
            style={{ fontSize: "16px", fontStyle: "normal", fontWeight: "600", color: "#9FA4A9", border: "none", outline: "none" }}
            />분
        </div>
        </PlayTime>
      </InfoBox>
    </div>
  );
}

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
  top: ${(props) => `${Math.min(-(props.time / 10 - 1) * 119.04, 0)}px`};
  min-height: 119.004px;
`;

const RecreationTitle = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
`;

const RecreationTitleInput = styled.input`
  &::placeholder {
    color: #9FA4A9;
  }

  &:focus::placeholder {
    color: transparent;
  }
`;

const PlayTimeInput = styled.input`
  width: 20px;
  &::placeholder {
    color: #9FA4A9;
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
  display: flex;
  align-items: flex-start;
  gap: 17px;
  margin-bottom: 21px;
`;

const Keyword = styled.div`
  display: flex;
  padding: 5px 29px;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background: #e9ebed;
`;

const PlayTime = styled.div`
  display: flex;
  gap: 21px;
`;