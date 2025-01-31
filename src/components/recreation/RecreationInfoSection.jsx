import styled from 'styled-components';
import React, { forwardRef } from 'react';
import PurposeChip from '../chip/PurposeChip';
import RecreationInfo from './RecreationInfo';
import RecreationAdditionalInfo from './RecreationAdditionalInfo';

const RecreationInfoSection = forwardRef(({ recreationData }, ref) => {
  const getPlaceText = () => {
    if (
      recreationData.placeList.includes('INDOOR') &&
      recreationData.placeList.includes('OUTDOOR')
    ) {
      return '실내, 실외';
    } else if (recreationData.placeList.includes('INDOOR')) {
      return '실내';
    } else if (recreationData.placeList.includes('OUTDOOR')) {
      return '실외';
    } else {
      return '';
    }
  };

  const getGenderText = () => {
    if (
      recreationData.genderList.includes('MALE') &&
      recreationData.genderList.includes('FEMALE')
    ) {
      return '여성, 남성';
    } else if (recreationData.placeList.includes('MALE')) {
      return '남성';
    } else if (recreationData.placeList.includes('FEMALE')) {
      return '여성';
    } else {
      return '';
    }
  };

  const getAgeText = (ageGroups) => {
    const ageGroupMap = {
      UNDER_TEENAGER: '10대 미만',
      TEENAGER: '10대',
      TWENTIES: '20대',
      THIRTIES: '30대',
      FORTIES: '40대',
      OVER_FIFTIES: '50대 이상',
    };

    const matchedAges = ageGroups.map((ageGroup) => ageGroupMap[ageGroup]);

    return matchedAges.join(', ');
  };

  const renderPurpose = () =>
    recreationData.purposeList.map((purpose, index) => {
      let translatedPurpose = '';

      switch (purpose) {
        case 'WORKSHOP':
          translatedPurpose = '워크샵';
          break;
        case 'SPORTS_DAY':
          translatedPurpose = '체육대회';
          break;
        case 'MT':
          translatedPurpose = 'MT';
          break;
        case 'GATHERING':
          translatedPurpose = '모임';
          break;
        case 'RETREAT':
          translatedPurpose = '수련회';
          break;
        default:
          translatedPurpose = purpose;
          break;
      }

      return <PurposeChip key={index} text={translatedPurpose} />;
    });
  const renderRecreationWay = () =>
    recreationData.wayList.map((ways, index) => (
      <div key={index}>
        <p>
          {index + 1}. {ways.contents}
        </p>
        {ways.imageUrl && <RecreationImg src={ways.imageUrl} alt={`이미지 ${index + 1}`} />}
      </div>
    ));
  console.log(recreationData);
  return (
    <InfoSection ref={ref}>
      <RecreationInfo title="레크레이션 소개">
        <Description>{recreationData.summary}</Description>
        <PlaceTimeContainer>
          <span>
            <span style={{ fontWeight: 'bold' }}>장소</span> {getPlaceText()}
          </span>
          <span>
            <span style={{ fontWeight: 'bold' }}>시간</span> {recreationData.playTime}분
          </span>
        </PlaceTimeContainer>
      </RecreationInfo>
      <RecreationInfo title="레크레이션 목적">
        <PurposeContainer>{renderPurpose()}</PurposeContainer>
      </RecreationInfo>
      <RecreationInfo title="레크레이션 방법">
        <RecreationWayContainer>{renderRecreationWay()}</RecreationWayContainer>
      </RecreationInfo>
      <RecreationInfo>
        <RecreationAdditionalInfoContainer>
          <RecreationAdditionalInfo
            info="people"
            content={`${recreationData.minParticipants}~${recreationData.maxParticipants}명`}
          />
          <RecreationAdditionalInfo
            info="preparation"
            content={`${
              recreationData.preparationList.length === 0 ? '없음' : recreationData.preparationList
            }`}
          />
          <RecreationAdditionalInfo info="gender" content={getGenderText()} />
          <RecreationAdditionalInfo info="age" content={getAgeText(recreationData.ageList)} />
        </RecreationAdditionalInfoContainer>
      </RecreationInfo>
    </InfoSection>
  );
});

export default RecreationInfoSection;

const InfoSection = styled.section`
  background-color: ${({ theme }) => theme.color.main05};
  padding: 2.5rem;
  border-radius: 1.2rem;
  border: 1px solid ${({ theme }) => theme.color.grayscale05};
  display: flex;
  flex-direction: column;
  gap: 4rem;
`;

const Description = styled.p`
  ${({ theme }) => theme.text.paragraph};
`;

const RecreationImg = styled.img`
  margin-top: 1rem;
  height: 22.5rem;
`;

const PlaceTimeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-size: ${({ theme }) => theme.text.small.fontSize};
`;

const PurposeContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const RecreationWayContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
`;

const RecreationAdditionalInfoContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
`;
