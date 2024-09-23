import React, { useState } from "react";
import styled from "styled-components";
import FlowRecreationBox from "./FlowRecreationBox";
import { ReactComponent as ScrapIcon } from "../../assets/recreation/scrapIcon.svg";
import { privateAPI } from "../../apis/user";

export default function FlowBox({
  num,
  marginRight,
  flowData,
  flowRecreations,
}) {
  console.log(flowData);
  console.log(flowRecreations);

  // const testJWT = "eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MiwiaWF0IjoxNzA3Mjk1MzkzLCJleHAiOjE5MDcyOTg5OTN9.yEvU_V98IMhnC09lEL_BdxU7aQTx69BclrAd9zjZL64";
  const [isScrapToggle, SetIsScrapToggle] = useState(
    flowData?.isFavorite || false
  );

  const onHandleScrap = async (recreationId) => {
    try {
      const response = await privateAPI.post(
        `/api/recreations/${recreationId}/favorites`,
        {}
      );
      if (response.data.code === "COMMON200") {
        SetIsScrapToggle(!isScrapToggle);
      } else {
        console.log(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const scrapIconColor = isScrapToggle ? "#ffd446" : "#E9EBED";
  return (
    <FlowBoxWrap marginRight={marginRight}>
      <TitleWrap>
        <NumberBox>{num}안</NumberBox>
        <FlowTitle>{flowData?.title}</FlowTitle>
        <IconWrap>
          <ScrapIcon
            fill={scrapIconColor}
            onClick={() => onHandleScrap(flowData.id)}
          />
        </IconWrap>
      </TitleWrap>
      {flowRecreations ? (
        flowRecreations.map((recreations, index) => (
          <FlowRecreationBox
            index={index}
            recreationTitle={recreations.title}
            kewords={recreations.keywordList}
            playTime={recreations.playTime}
          />
        ))
      ) : (
        <SubText> 추천 플로우가 존재하지 않습니다. </SubText>
      )}
    </FlowBoxWrap>
  );
}

const FlowBoxWrap = styled.div`
  align-items: center;
  justify-content: center;
  width: 510px;
  border-radius: 20px;
  border: 0.5px solid #9fa4a9;
  padding: 30px 34px;
  margin-right: ${(props) => props.marginRight || "0px"};
`;
const TitleWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 60px;
`;
const FlowTitle = styled.div`
  color: #1b1d1f;
  text-align: center;
  font-size: 24px;
  font-weight: 700;
  margin: 0px 150px 0px 85px;
  word-break: break-word;
  overflow-wrap: break-word;
`;

const NumberBox = styled.div`
  display: inline-flex;
  width: 38px;
  height: 29px;
  padding: 2px 10px;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  border: 0.5px solid #1b1d1f;
`;
const SubText = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 80px;
  color: #9fa4a9;
  font-size: 20px;
  font-weight: 400;
  margin-bottom: 31px;
  line-height: 30px;
`;
const IconWrap = styled.div`
  cursor: pointer;
`;
