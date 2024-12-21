import React, { useState } from "react";
import styled from "styled-components";
import FlowRecreationBox from "./FlowRecreationBox";
import { ReactComponent as ScrapIcon } from "../../assets/recreation/scrapIcon.svg";
import { privateAPI } from "../../apis/user";
import useLoginModalStore from "../../stores/loginModalStore";
import useLoginStore from "../../stores/loginStore";
export default function FlowBox({
  num,
  marginRight,
  flowData,
  flowRecreations,
}) {
  const { modalControl } = useLoginModalStore();
  const { isLoggedIn } = useLoginStore((state) => state);

  const [isScrapToggle, SetIsScrapToggle] = useState(
    flowData?.isFavorite || false
  );

  const onHandleScrap = async (flowId) => {
    if (!isLoggedIn) {
      // 로그인 안 되어 있으면 모달 띄우기
      modalControl();
      return;
    }
    try {
      const response = await privateAPI.post(`/api/flows/${flowId}/scraps`, {});
      console.log("스크랩 완료: ", response);
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
  console.log("플로우 레크레이션", flowRecreations);
  return (
    <FlowBoxWrap marginRight={marginRight}>
      <TitleWrap>
        <NumberBox>{num}안</NumberBox>
        <FlowTitle>{flowData?.title}</FlowTitle>
        {flowRecreations &&
          flowRecreations.length > 0 && ( // 추천 플로우가 있을 때만 스크랩 아이콘 렌더링
            <IconWrap>
              <ScrapIcon
                fill={scrapIconColor}
                onClick={() => onHandleScrap(flowData.id)}
              />
            </IconWrap>
          )}
      </TitleWrap>
      {flowRecreations && flowRecreations.length > 0 ? (
        flowRecreations.map((recreations, index) => (
          <FlowRecreationBox
            key={index}
            index={index}
            recreationTitle={recreations.title}
            keywords={recreations.keywordList}
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
  width: 100%;
  word-break: break-word;
  overflow-wrap: break-word;
`;

const NumberBox = styled.div`
  display: inline-flex;
  width: 45px;
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
