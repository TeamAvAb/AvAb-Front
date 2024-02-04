import React, { useState } from "react";
import styled from "styled-components";
import Scrap2 from "../../assets/scrapflow/scrap2.png";
import Time from "../../assets/scrapflow/time.png";
import View from "../../assets/scrapflow/view.png";
import Write from "../../assets/scrapflow/write.png";
import User from "../../assets/scrapflow/user.png";
import Blank from "../../assets/scrapflow/blank.png";
import { flowN } from "../../pages/ScrapFlow";
import { useNavigate } from 'react-router-dom';

export default function ScrapFlowBox() {
  // 스크랩 상태
  const [doScrap, setDoScrap] = useState(false);
  // 스크랩 상태 변경
  const scrapping = () => {
    doScrap ? setDoScrap(false) : setDoScrap(true);
  };

  // 자세히 보기
  const navigate = useNavigate();
  const moveToMoreInfo = ()=>{
    navigate(`/flow/morewatchflow`)
  }

  //flowN에 값에 따라 div 추가
  const divs = [];

  for (let i = 0; i < flowN; i++) {
    divs.push(
      <MyFlowBoxChild>
        {/* 키워드 */}
        <FlowBoxKeyWord>신년회</FlowBoxKeyWord>

        {/* 스크랩 버튼 */}
        <FlowBoxScrapBox>
          <FlowBoxScrapImg src={Scrap2} alt="스크랩" onClick={scrapping} />
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
        <MoreBtn onClick={moveToMoreInfo}>자세히 보기</MoreBtn>
      </MyFlowBoxChild>
    );
  }

  return (
    <div style={{ marginTop: "230.65px", marginLeft: "-34px" }}>
      <MyFlowBoxParent>{divs}</MyFlowBoxParent>
    </div>
  );
}

const MyFlowBoxParent = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 370px);
  row-gap: 20px;
  column-gap: 120px;
`;

const MyFlowBoxChild = styled.div`
  width: 368px;
  height: 408px;
  background-color: white;
  border-radius: 20px;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.15);
  position: relative;
`;

const FlowBoxKeyWord = styled.div`
  background-color: #a0ddff;
  border-radius: 45px;
  position: absolute;
  color: #1b1d1f;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  padding: 16px 34px;
  margin-top: 37px;
  margin-left: 36px;
`;

const FlowBoxTitle = styled.div`
  margin-top: 116px;
  margin-left: 36px;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
`;

const FlowBoxScrapBox = styled.div`
  width: 42px;
  height: 42px;
  position: absolute;
  margin-top: 37px;
  margin-left: 291px;
`;

const FlowBoxScrapImg = styled.img`
  position: absolute;
  width: 22px;
  height: 30px;
  cursor: pointer;
`;

const FlowBoxImg = styled.img`
  margin-top: 23px;
  margin-left: 36px;
  width: 142px;
  height: 142px;
`;

const FlowBoxDetailBox = styled.div`
  margin-left: 239px;
  margin-top: -168px;
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
