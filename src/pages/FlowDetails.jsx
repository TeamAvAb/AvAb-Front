import React, { useEffect, useState } from 'react';
import { privateAPI, publicAPI } from '../apis/user';
import styled from 'styled-components';
import RecreationInfo from '../components/recreationInfo/RecreationInfo';
import { Helmet } from 'react-helmet';
import useLoginStore from '../stores/loginStore';
import { useLocation } from 'react-router-dom';
import FlowInfoSection from '../components/flowDetails/FlowInfoSection';

const PurposeList = {
  MT: 'MT',
  GATHERING: '모임',
  WORKSHOP: '워크샵',
  RETREAT: '수련회',
  SPORTS_DAY: '체육대회',
};

const KeywordList = {
  COOPERATIVE: '협동',
  QUICKNESS: '순발력',
  SENSIBLE: '센스',
  BRAIN: '두뇌',
  CREATIVE: '창의력',
  ACTIVE: '액티브',
  PSYCHOLOGICAL: '심리',
  LUCK: '행운',
  COMMON_SENSE: '상식',
  PREPARATION: '준비물',
};

const GenderList = {
  MALE: '남성',
  FEMALE: '여성',
};

const AgeList = {
  UNDER_TEENAGER: '10대 미만',
  TEENAGER: '10대',
  TWENTIES: '20대',
  THIRTIES: '30대',
  FORTIES: '40대',
  OVER_FIFTIES: '50대 이상',
};

export default function FlowDetails() {
  const { isLoggedIn } = useLoginStore((state) => state);

  const location = useLocation();
  const id = location.pathname.split('/')[3];

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const api = isLoggedIn ? privateAPI : publicAPI;
        const response = await api.get(`/api/flows/${id}`);
        setData(response.data.result);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id]);

  return (
    data.length !== 0 && (
      <>
        <Helmet>
          <title>{`${data.flowDetail.title} - AvAb | 레크레이션 플로우 공유`}</title>
          <meta
            name="description"
            content={`${data.flowDetail.title} 플로우에 대한 상세 정보입니다. AvAb에서 다양한 레크레이션 정보를 확인하고, 자신만의 플로우를 만들어 공유하세요.`}
          />
        </Helmet>
        {/* 모달창 */}

        <FlowInfoSection flow={data.flowDetail} />

        <FlowDetailsMainSection>
          <FlowInfoBox>
            <FlowInfoTitle>
              <div>기본정보</div>
              <div>세부정보</div>
            </FlowInfoTitle>

            <FlowInfoDetail>
              <div style={{ width: '284px' }}>
                <div style={{ display: 'flex', marginBottom: '8px' }}>
                  <FlowInfo style={{ width: '28px' }}>목적</FlowInfo>
                  <FlowInfo2 style={{ fontWeight: '400', maxWidth: '240px' }}>
                    {data.flowDetail.purposeList.map((p) => PurposeList[p]).join(', ')}
                  </FlowInfo2>
                </div>
                <div style={{ display: 'flex' }}>
                  <FlowInfo>플레이 시간</FlowInfo>
                  <div>{data.flowDetail.totalPlayTime}분</div>
                </div>
              </div>

              <Line />

              <div style={{ marginLeft: '29px' }}>
                <div style={{ display: 'flex', marginBottom: '8px' }}>
                  <FlowInfo>키워드</FlowInfo>
                  <FlowInfo2>
                    {data.flowDetail.keywordList.map((keyword) => (
                      <div>{KeywordList[keyword]}</div>
                    ))}
                  </FlowInfo2>
                </div>
                <div style={{ display: 'flex', marginBottom: '8px' }}>
                  <FlowInfo>성별</FlowInfo>
                  <FlowInfo2>
                    {data.flowDetail.gender.map((gender) => (
                      <div>{GenderList[gender]}</div>
                    ))}
                  </FlowInfo2>
                </div>
                <div style={{ display: 'flex', marginBottom: '8px' }}>
                  <FlowInfo>연령대</FlowInfo>
                  <FlowInfo2>
                    {data.flowDetail.age.map((age) => (
                      <div>{AgeList[age]}</div>
                    ))}
                  </FlowInfo2>
                </div>
                <div style={{ display: 'flex', marginBottom: '8px' }}>
                  <FlowInfo>인원</FlowInfo>
                  <div>{data.flowDetail.participants}명</div>
                </div>
              </div>
            </FlowInfoDetail>

            <FlowContainer>
              <FlowTitle>플로우 제목</FlowTitle>

              {/* 레크레이션 박스 */}
              <RecreationBox>
                {data.recreations.map((recreation, i) => (
                  <RecreationInfo recreation={recreation} num={i} />
                ))}
              </RecreationBox>
            </FlowContainer>
          </FlowInfoBox>
        </FlowDetailsMainSection>
      </>
    )
  );
}

const FlowInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FlowInfoTitle = styled.div`
  width: 608px;
  height: 83px;
  border-radius: 20px;
  border: 1px solid #cacdd2;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 13px;
  gap: 225px;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
`;

const FlowInfoDetail = styled.div`
  box-sizing: border-box;
  width: 608px;
  height: 158px;
  border-radius: 20px;
  border: 1px solid #cacdd2;
  background: white;
  margin-bottom: 40px;
  padding: 29px 20px;
  display: flex;
  align-items: center;
  position: relative;
  flex: 1;
`;

const FlowInfo = styled.div`
  margin-right: 8px;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
`;

const FlowInfo2 = styled.div`
  display: flex;
  gap: 8px;
  max-width: 190px;
  flex-wrap: wrap;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const FlowContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 170px;
  margin-bottom: 131px;
  border-radius: 20px;
  border: 0.5px solid #9fa4a9;
  background: white;
`;

const Line = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  border: 0.5px solid #cacdd2;
  width: 0.5px;
  margin-top: 29px;
  margin-bottom: 29px;
`;

const FlowTitle = styled.div`
  margin-bottom: 59px;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
`;

const RecreationBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-start;
  margin-bottom: 8px;
`;

const FlowDetailsMainSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 0 8rem;
`;
