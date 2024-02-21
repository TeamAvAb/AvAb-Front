import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import fix from "../../assets/flowwrite/fix_flow_write.png";
import deleteIcon from "../../assets/flowwrite/deleteIcon.png";
import DetailKeywordModal from "../flowwrite/DetailKeywordModal";

export default function WriteRecreationInfo({ num, onDelete }) {
  const [title, setTitle] = useState("");
  const [time, setTime] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedKeywords, setSelectedKeywords] = useState([]);

  // useEffect(() => {
  //   // API를 통해 레크레이션 정보를 가져오는 함수
  //   const fetchRecreationData = async () => {
  //     try {
  //       // API를 호출하여 데이터 가져오기
  //       const response = await axios.get('https://dev.avab.shop/api/recreations/recommended', {
  //           params: {
  //             playTime: time,
  //             purpose: 'SPORTS_DAY'
  //           }
  //         });
  //         console.log('API 응답 데이터:', response.data);
  //       // 데이터에서 필요한 정보 추출
  //       const { title, keywordList, playTime } = response.data;
  //       console.log('추가된 레크레이션 데이터:', { title, keywordList, playTime });

  //       // 추출한 정보를 저장
  //       return { title, keywordList, playTime };
  //     } catch (error) {
  //       // 에러 발생 시 에러 처리
  //       console.error('추가 중 오류 발생:', error);
  //     }
  //   };

  // // fetchRecreationData 함수 호출
  // const fetchData = async () => {
  //   const data = await fetchRecreationData();
  //   console.log('데이터:', data); // 받은 데이터 출력
  // };

  // // fetchData 함수 호출
  // fetchData();
  // fetchRecreationData();
  // }, [time]);

  const handleTitleChange = (e) => {
    // 사용자 입력이 변경될 때마다 title 상태 업데이트
    setTitle(e.target.value);
  };

  const handleTimeChange = (e) => {
    // 사용자 입력이 변경될 때마다 time 상태 업데이트
    setTime(e.target.value);
  };

  const handleDeleteClick = () => {
    // onDelete 함수를 호출하여 해당 InfoBox를 삭제합니다.
    onDelete(num);
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
    // Prevent the click event from propagating to the parent container (PurposeSearch)
    event.stopPropagation();

    const updatedKeywords = [...selectedKeywords];
    updatedKeywords.splice(index, 1);
    setSelectedKeywords(updatedKeywords);
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
      {isModalOpen && (
        <DetailKeywordModal
          onClose={handleCloseModal}
          onSelectDetailKeywords={handleSelectDetailKeywords}
          selectedKeywords={selectedKeywords}
        />
      )}
      <Line time={time}></Line>
      <InfoBox time={time}>
        {/* 레크레이션 제목 */}
        <RecreationTitle>
          <Number>{num + 1}</Number>
          <RecreationTitleInput
            type="text"
            value={title}
            onChange={handleTitleChange}
            placeholder="레크레이션 제목 입력"
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

        {/* 레크레이션 키워드 */}
        {/* <KeywordBox>
          <Keyword>키워드 1</Keyword>
          <Keyword>키워드 2</Keyword>
          <Keyword>키워드 3</Keyword>
        </KeywordBox> */}

        <KeywordBox onClick={handleDetailSearchClick}>
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
            <PlayTimeInput
              type="text"
              value={time}
              onChange={handleTimeChange}
              style={{
                fontSize: "16px",
                fontStyle: "normal",
                fontWeight: "600",
                color: "#9FA4A9",
                border: "none",
                outline: "none",
              }}
            />
            분
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

const PlayTimeInput = styled.input`
  width: 20px;
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
