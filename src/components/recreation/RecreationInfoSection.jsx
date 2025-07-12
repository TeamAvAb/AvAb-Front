import styled from 'styled-components';
import React, { forwardRef } from 'react';
import RecreationInfo from './RecreationInfo';
import RecreationAdditionalInfo from './RecreationAdditionalInfo';
import PurposeChip from '../common/chip/PurposeChip';
import PLACE from '../../constants/enum/place';
import GENDER from '../../constants/enum/gender';
import AGE from '../../constants/enum/age';
import PURPOSE from '../../constants/enum/purpose';
import theme from '@/styles/theme';

const RecreationInfoSection = forwardRef(({ recreationData }, ref) => {
  const getPlaceText = () => recreationData.placeList.map((place) => PLACE[place].value).join(', ');

  const getGenderText = () =>
    recreationData.genderList.map((gender) => GENDER[gender].value).join(', ');

  const getAgeText = () => recreationData.ageList.map((age) => AGE[age].value).join(', ');

  const renderPurpose = () =>
    recreationData.purposeList.map((purpose) => (
      <PurposeChip key={purpose} text={PURPOSE[purpose].value} />
    ));

  const renderRecreationWay = () =>
    recreationData.wayList.map((ways, index) => (
      <div key={index}>
        <p>
          {index + 1}. {ways.content}
        </p>
        {ways.imageUrl && <RecreationImg src={ways.imageUrl} alt={`이미지 ${index + 1}`} />}
      </div>
    ));

  return (
    <InfoSection ref={ref}>
      <RecreationInfo title="레크레이션 소개">
        <Description>{recreationData.summary}</Description>
        <PlaceTimeContainer>
          <span>
            <span className="label">장소</span>
            {getPlaceText()}
          </span>
          <span>
            <span className="label">시간</span>
            {recreationData.playTime}분
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
          <RecreationAdditionalInfo info="age" content={getAgeText()} />
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
  font-weight: ${({ theme }) => theme.text.small.fontWeight};

  .label {
    font-weight: ${({ theme }) => theme.text.smallBold.fontWeight};
    margin-right: 0.5rem;
  }
`;

const PurposeContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const RecreationWayContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  font-size: ${({ theme }) => theme.text.paragraph.fontSize};
  font-weight: ${({ theme }) => theme.text.paragraph.fontWeight};
`;

const RecreationAdditionalInfoContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
`;
