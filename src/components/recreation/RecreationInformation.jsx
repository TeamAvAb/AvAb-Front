import styled from "styled-components";
import React, { forwardRef } from "react";
import peopleIcon from "../../assets/recreation/peopleIcon.svg";
import fixIcon from "../../assets/recreation/fixIcon.svg";
import genderIcon from "../../assets/recreation/genderIcon.svg";
import timeIcon from "../../assets/recreation/timeIcon.svg";

const RecreationInformation = forwardRef(({ recreationData }, ref) => {
  const getPlaceText = () => {
    if (
      recreationData.placeList.includes("INDOOR") &&
      recreationData.placeList.includes("OUTDOOR")
    ) {
      return "실내, 실외";
    } else if (recreationData.placeList.includes("INDOOR")) {
      return "실내";
    } else if (recreationData.placeList.includes("OUTDOOR")) {
      return "실외";
    } else {
      return "";
    }
  };

  const getGenderText = () => {
    if (
      recreationData.genderList.includes("MALE") &&
      recreationData.genderList.includes("FEMALE")
    ) {
      return "여성, 남성";
    } else if (recreationData.placeList.includes("MALE")) {
      return "남성";
    } else if (recreationData.placeList.includes("FEMALE")) {
      return "여성";
    } else {
      return "";
    }
  };

  const getAgeText = (ageGroups) => {
    const ageGroupMap = {
      UNDER_TEENAGER: "10대 미만",
      TEENAGER: "10대",
      TWENTIES: "20대",
      THIRTIES: "30대",
      FORTIES: "40대",
      OVER_FIFTIES: "50대 이상",
    };

    const matchedAges = ageGroups.map((ageGroup) => ageGroupMap[ageGroup]);

    return matchedAges.join(", ");
  };

  const translatedPurposeList = recreationData.purposeList.map(
    (purpose, index) => {
      let translatedPurpose = "";

      switch (purpose) {
        case "WORKSHOP":
          translatedPurpose = "워크샵";
          break;
        case "SPORTS_DAY":
          translatedPurpose = "체육대회";
          break;
        case "MT":
          translatedPurpose = "MT";
          break;
        case "GATHERING":
          translatedPurpose = "모임";
          break;
        case "RETREAT":
          translatedPurpose = "수련회";
          break;
        default:
          translatedPurpose = purpose;
          break;
      }

      return <PurposeBox key={index}>{translatedPurpose}</PurposeBox>;
    }
  );
  const wayListImages = recreationData.wayList.map((ways, index) => (
    <div key={index}>
      <ContentText>
        {index + 1}. {ways.contents}
      </ContentText>
      {ways.imageUrl && (
        <RecreationImg src={ways.imageUrl} alt={`이미지 ${index + 1}`} />
      )}
    </div>
  ));

  return (
    <RecreationInformationContainer ref={ref}>
      <ContentBox>
        <TitleText>레크레이션 소개</TitleText>
        <ContentText>{recreationData.summary}</ContentText>
        <PlaceTime marginTop="28px">
          <ContentText fontSize="16px" fontWeight="600" marginRight="8px">
            장소
          </ContentText>
          <ContentText fontSize="16px">{getPlaceText()}</ContentText>
        </PlaceTime>
        <PlaceTime>
          <ContentText fontSize="16px" fontWeight="600" marginRight="8px">
            진행시간
          </ContentText>
          <ContentText fontSize="16px">{recreationData.playTime}분</ContentText>
        </PlaceTime>
      </ContentBox>
      <ContentBox>
        <TitleText>레크레이션 목적</TitleText>
        {translatedPurposeList}
      </ContentBox>
      <ContentBox>
        <TitleText>레크레이션 방법</TitleText>
        {wayListImages}
      </ContentBox>
      <IconBox>
        <Circle>
          <img src={peopleIcon}></img>
          <CircleText>조별 추천 인원</CircleText>
          <CircleSubText>
            {recreationData.minParticipants}~{recreationData.maxParticipants}명
          </CircleSubText>
        </Circle>
        <Circle>
          <img src={fixIcon}></img>
          <CircleText>준비물</CircleText>
          <CircleSubText>{recreationData.preparationList}</CircleSubText>
        </Circle>
        <Circle>
          <img src={genderIcon}></img>
          <CircleText>성별</CircleText>
          <CircleSubText>{getGenderText()}</CircleSubText>
        </Circle>
        <Circle marginRight="0px">
          <img src={timeIcon}></img>
          <CircleText>연령대</CircleText>
          <CircleSubText>{getAgeText(recreationData.ageList)}</CircleSubText>
        </Circle>
      </IconBox>
    </RecreationInformationContainer>
  );
});

export default RecreationInformation;

const RecreationInformationContainer = styled.div`
  background-color: white;
  padding: 40px 44px;
  border-radius: 20px;
  border: 0.5px solid #cacdd2;
  margin-bottom: 60px;
`;

const TitleText = styled.div`
  color: #1b1d1f;
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 28px;
`;

const ContentText = styled.div`
  color: #1b1d1f;
  font-size: ${(props) => props.fontSize || "20px"};
  font-weight: ${(props) => props.fontWeight || "400"};
  margin-right: ${(props) => props.marginRight || "0px"};
  line-height: 30px;
`;

const ContentBox = styled.div`
  border-bottom: #cacdd2 0.5px solid;
  padding-bottom: 28px;
  margin-bottom: 60px;
`;

const IconBox = styled.div`
  padding-bottom: 28px;
  display: flex;
  justify-content: center;
`;

const Circle = styled.div`
  width: 220px;
  height: 220px;
  background-color: #f7f8f9;
  border-radius: 50%;
  filter: drop-shadow(0px 0px 40px rgba(0, 0, 0, 0.1));
  justify-content: center;
  display: flex;
  text-align: center;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: column;
  margin-right: ${(props) => props.marginRight || "122px"};
`;
const CircleText = styled.div`
  color: #5b6bbe;
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 18px;
`;

const CircleSubText = styled.div`
  color: #9fa4a9;
  text-align: center;
  font-size: 20px;
  font-weight: 400;
  width: 150px;
`;

const PurposeBox = styled.div`
  display: inline-flex;
  padding: 16px 34px;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  background: #a0ddff;
  color: #1b1d1f;
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  margin-right: 15px;
`;

const RecreationImg = styled.img`
  margin-bottom: 40px;
  margin-top: 15px;
  height: 360px;
`;

const PlaceTime = styled.div`
  display: flex;
  align-items: center;
  margin-top: ${(props) => props.marginTop || "8px"};
`;
