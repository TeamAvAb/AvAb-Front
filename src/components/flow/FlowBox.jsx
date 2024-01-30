import React, { useState } from "react";
import styled from "styled-components";
import Scrap from "../../assets/watchflow/scrap.png";
import Scrap2 from "../../assets/watchflow/scrap2.png";
import Time from "../../assets/watchflow/time.png";
import View from "../../assets/watchflow/view.png";
import Write from "../../assets/watchflow/write.png";
import User from "../../assets/watchflow/user.png";
import Blank from "../../assets/watchflow/blank.png";

export default function FlowBox() {
  // 스크랩 상태
  const [doScrap, setDoScrap] = useState(false);
  // 스크랩 상태 변경
  const scrapping = () => {
    doScrap ? setDoScrap(false) : setDoScrap(true);
  };

  return (
    <div>
      <MyFlowBoxParent>
        <MyFlowBoxChild>
          {/* 키워드 */}
          <FlowBoxKeyWord>신년회</FlowBoxKeyWord>

          {/* 스크랩 버튼 */}
          <FlowBoxScrapBox>
            {doScrap ? (
              <FlowBoxScrapImg src={Scrap2} alt="스크랩" onClick={scrapping} />
            ) : (
              <FlowBoxScrapImg src={Scrap} alt="스크랩" onClick={scrapping} />
            )}
          </FlowBoxScrapBox>

          {/* 플로우 이름 */}
          <FlowBoxTitle>플로우 이름</FlowBoxTitle>

          {/* 플로우 사진 */}
          <FlowBoxImg src={Blank} alt="플로우 사진" />

          {/* 플로우 세부사항 - 시간,조회수,작성자,사용자수 */}
          <FlowBoxDetailBox>
            <FlowBoxDetails>
              <FlowBoxDetailImg>
                <img src={Time} alt="시간" style={{ width: "38px", height: "38px" }} />
              </FlowBoxDetailImg>
              <FlowBoxDetail>70분</FlowBoxDetail>
            </FlowBoxDetails>
            <FlowBoxDetails>
              <FlowBoxDetailImg>
                <img src={View} alt="조회수" style={{ width: "38px", height: "38px" }} />
              </FlowBoxDetailImg>
              <FlowBoxDetail>2,232</FlowBoxDetail>
            </FlowBoxDetails>
            <FlowBoxDetails>
              <FlowBoxDetailImg>
                <img src={Write} alt="작성자" style={{ width: "35px", height: "35px" }} />
              </FlowBoxDetailImg>
              <FlowBoxDetail>윤카우</FlowBoxDetail>
            </FlowBoxDetails>
            <FlowBoxDetails>
              <FlowBoxDetailImg>
                <img src={User} alt="사용자수" style={{ width: "24px", height: "24px" }} />
              </FlowBoxDetailImg>
              <FlowBoxDetail>2,232</FlowBoxDetail>
            </FlowBoxDetails>
          </FlowBoxDetailBox>
          <MoreBtn>자세히 보기</MoreBtn>
        </MyFlowBoxChild>
        <MyFlowBoxChild></MyFlowBoxChild>
        <MyFlowBoxChild></MyFlowBoxChild>
        <MyFlowBoxChild></MyFlowBoxChild>
        <MyFlowBoxChild></MyFlowBoxChild>
        <MyFlowBoxChild></MyFlowBoxChild>
      </MyFlowBoxParent>
    </div>
  );
}

const MyFlowBoxParent = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 370px);
  margin-top: 4vh;
  row-gap: 20px;
  column-gap: 120px;
`;

const MyFlowBoxChild = styled.div`
  width: 370px;
  height: 409px;
  background-color: white;
  border-radius: 20px;
  box-shadow: 0px -2px 20px -10px gray;
  position: relative;
`;

const FlowBoxKeyWord = styled.div`
  background-color: #a0ddff;
  border-radius: 45px;
  position: absolute;
  color: #1b1d1f;
  font-size: 20px;
  font-weight: bold;
  width: 120px;
  height: 56px;
  top: 37px;
  left: 37px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FlowBoxTitle = styled.div`
  position: absolute;
  top: 116px;
  left: 37px;
  font-size: 24px;
  font-weight: bold;
`;

const FlowBoxScrapBox = styled.div`
  position: absolute;
  top: 32px;
  left: 292px;
  width: 42px;
  height: 42px;
`;

const FlowBoxScrapImg = styled.img`
  position: absolute;
  width: 22px;
  height: 30px;
  cursor: pointer;
`;

const FlowBoxImg = styled.img`
  position: absolute;
  top: 168px;
  left: 37px;
  width: 142px;
  height: 142px;
`;

const FlowBoxDetailBox = styled.div`
  position: absolute;
  top: 142px;
  left: 240px;
`;

const FlowBoxDetails = styled.div`
  width: 93px;
  height: 42px;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FlowBoxDetail = styled.div`
  width: 93px;
  height: 42px;
  font-size: 16px;
  display: flex;
  justify-content: right;
  align-items: center;
`;

const FlowBoxDetailImg = styled.div`
  width: 42px;
  height: 42px;
  display: flex;
  justify-content: right;
  align-items: center;
`;

const MoreBtn = styled.div`
  background-color: #b1beff;
  width: 370px;
  height: 76px;
  font-size: 20px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: absolute;
  top: 333px;
  border-radius: 0px 0px 20px 20px;

  &:hover {
    background-color: #a0ddff;
    transition: 0.2s;
  }
`;
