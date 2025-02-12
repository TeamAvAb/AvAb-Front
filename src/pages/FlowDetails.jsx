import React, { useEffect, useState } from 'react';
import { privateAPI, publicAPI } from '../apis/user';
import styled from 'styled-components';
import Close from '../assets/myflow/close.png';
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

  const [share, setShare] = useState(false);
  const [modal, setModal] = useState(false);
  const [data, setData] = useState([]);

  // 삭제 버튼 모달창을 위한 상태

  // 모달 창 열기 위한 상태 변화 함수
  const OpenModal = () => {
    setModal(true);
  };
  // 공유 버튼 누를 시 상태 변화 함수
  const handleShareClick = () => {
    setShare(true);
    navigator.clipboard
      .writeText(location.href)
      .then(() => {
        console.log('Url copied to clipboard');
      })
      .catch((err) => {
        console.error('Could not copy text: ', err);
      });
  };
  // 삭제 모달 창 닫기 위한 상태 변화 함수
  const close = () => {
    setModal(false);
    setShare(false);
  };

  // moreData 가져오기

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

        <div>
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
        </div>

        {modal ? (
          <ModalContainer>
            <ModalBox>
              <CloseBtn onClick={close}>
                <img src={Close} alt="닫기" />
              </CloseBtn>
              <ModalBoxDetail>
                <div>
                  <ModalTitle>
                    일정 플로우를
                    <br />
                    공유하세요!
                  </ModalTitle>
                </div>
                {share ? (
                  <AfterCopyBtn>복사 완료</AfterCopyBtn>
                ) : (
                  <BeforeCopyBtn onClick={handleShareClick}>링크 복사하기</BeforeCopyBtn>
                )}
              </ModalBoxDetail>
            </ModalBox>
          </ModalContainer>
        ) : (
          <></>
        )}
      </>
    )
  );
}

// 모달창
const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  background: rgba(70, 76, 82, 0.5);
  z-index: 999;
`;

const ModalBox = styled.div`
  width: 440px;
  height: 435px;
  border-radius: 20px;
  background: white;
  position: fixed;
  top: 215px;
  left: 50%;
  transform: translate(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalBoxDetail = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 60px;
`;

const CloseBtn = styled.div`
  width: 42px;
  height: 42px;
  position: absolute;
  top: 20px;
  left: 378px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const ModalTitle = styled.div`
  font-size: 36px;
  font-style: normal;
  font-weight: 700;
  text-align: center;
  margin-bottom: 8px;
`;

const BeforeCopyBtn = styled.div`
  display: flex;
  box-sizing: border-box;
  width: 223px;
  padding: 15px 34px;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  background: #4036ed;
  color: white;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  text-align: center;
  cursor: pointer;
`;

const AfterCopyBtn = styled.div`
  display: flex;
  box-sizing: border-box;
  height: 54px;
  width: 223px;
  padding: 15px 34px;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  border: 1px solid #4036ed;
  background: white;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  color: #4036ed;
  text-align: center;
`;

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
