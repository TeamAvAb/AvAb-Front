import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import fix from "../../assets/flowwrite/fix_flow_write.png";

export default function AddRecreationInfo({
  num,
  title,
  playTime,
  keywordList,
  onDelete,
}) {
  // const [title, setTitle] = useState("");
  const [time, setTime] = useState(10);

  const DetailMappings = {
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

  useEffect(() => {
    // API를 통해 레크레이션 정보를 가져오는 함수
    const fetchRecreationData = async () => {
      try {
        // API를 호출하여 데이터 가져오기
        const response = await axios.get(
          "https://dev.avab.shop/api/recreations/recommended",
          {
            params: {
              playTime: time,
              purpose: "SPORTS_DAY",
            },
          }
        );
        console.log("API 응답 데이터:", response.data);
        // 데이터에서 필요한 정보 추출
        const { title, keywordList, playTime } = response.data;
        console.log("추가된 레크레이션 데이터:", {
          title,
          keywordList,
          playTime,
        });

        // 추출한 정보를 저장
        return { title, keywordList, playTime };
      } catch (error) {
        // 에러 발생 시 에러 처리
        console.error("추가 중 오류 발생:", error);
      }
    };

    // fetchRecreationData 함수 호출
    const fetchData = async () => {
      const data = await fetchRecreationData();
      console.log("데이터:", data); // 받은 데이터 출력
    };

    // fetchData 함수 호출
    fetchData();
    fetchRecreationData();
  }, [time]);

  const handleDeleteClick = () => {
    // onDelete 함수를 호출하여 해당 InfoBox를 삭제합니다.
    onDelete(num);
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "8px",
        alignItems: "end",
        marginBottom: "8px",
      }}
    >
      <Line time={playTime}></Line>
      <InfoBox time={playTime}>
        {/* 레크레이션 제목 */}
        <RecreationTitle>
          <Number>{num}</Number>
          <RecreationTitleInput
            type="text"
            value={title}
            style={{
              fontSize: "20px",
              fontStyle: "normal",
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
          <div style={{ width: "90%", display: "flex" }}>
            {keywordList.map((keyword, index) => (
              <StyledKeyword
                key={index}
                style={{
                  padding: "5px 20px",
                  width: "123px",
                  height: "29px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#F0F0F0",
                  borderRadius: "4px",
                  marginRight: "8px",
                }}
              >
                {DetailMappings[keyword]}
              </StyledKeyword>
            ))}
          </div>
        </KeywordBox>
        {/* 레크레이션 소요 시간 */}
        <PlayTime>
          <div
            style={{
              fontSize: "16px",
              fontStyle: "normal",
              fontWeight: "500",
              color: "#1B1D1F",
            }}
          >
            플레이까지
          </div>
          <div
            style={{
              fontSize: "16px",
              fontStyle: "normal",
              fontWeight: "600",
              color: "#1B1D1F",
            }}
          >
            {playTime} 분
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

  /*transition: height 0.5s cubic-bezier(0.4, 0, 0.2, 1);*/
  // 이상해짐
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
  font-style: normal;
  font-weight: 700;
  margin-right: 8px;
`;

const KeywordBox = styled.div`
  width: 371px;
  color: #9fa4a9;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
  margin-bottom: 15px;
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

// const KeywordBox = styled.div`
//   display: flex;
//   align-items: flex-start;
//   gap: 17px;
//   margin-bottom: 21px;
// `;

// const Keyword = styled.div`
//   display: flex;
//   padding: 5px 29px;
//   justify-content: center;
//   align-items: center;
//   border-radius: 5px;
//   background: #e9ebed;
// `;

const PlayTime = styled.div`
  display: flex;
  gap: 21px;
`;
