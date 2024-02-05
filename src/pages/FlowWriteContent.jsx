import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import write1 from '../assets/flowwrite/write_1.png';
import write2 from '../assets/flowwrite/write_2.png';
import write3 from '../assets/flowwrite/write_3.png';
import writeSelect4 from '../assets/flowwrite/write_select_4.png';
import line from '../assets/flowwrite/line.png';
import blankImg from "../assets/main/blankImg.png";
// import WithoutSaving from '../components/flowwrite/WithoutSavingModal.jsx'
// import TimeOut from '../components/flowwrite/TimeOutModal.jsx'
import NoTitle from '../components/flowwrite/NoTitleModal.jsx'
import WriteRecreationInfo from "../components/flowwrite/WriteRecreationInfo.jsx";
import RecommendRecreation from "../components/flowwrite/RecommendRecreation.jsx";

export default function FlowWriteContent() {
  const navigate = useNavigate();
  const [modal, setModal] = useState(null);
  const [flowTitle, setFlowTitle] = useState("");
  const [time] = useState(10);

  const handleNextClick = () => {
    // Temporary condition to show WithoutSaving modal when Save button is clicked
    const shouldShowWithoutSaving = true;
  
    if (shouldShowWithoutSaving) {
      setModal(<NoTitle onClose={() => setModal(null)} />);
    } else {
      // Continue with navigation logic
      navigate('/flow/my');
    }
  };

  const recreationData = [
    {
      index: 1,
      title: "레크레이션 1",
      keywords: "키워드1, 키워드2, 키워드3",
      imgSrc: blankImg,
      add: "추가하기",
      rate: "4.5",
    },
    {
      index: 2,
      title: "레크레이션 2",
      keywords: "키워드1, 키워드2, 키워드3",
      imgSrc: blankImg,
      add: "추가하기",
      rate: "4.5",
    },
    {
      index: 3,
      title: "레크레이션 3",
      keywords: "키워드1, 키워드2, 키워드3",
      imgSrc: blankImg,
      add: "추가하기",
      rate: "4.5",
    },
    {
      index: 4,
      title: "레크레이션 4",
      keywords: "키워드1, 키워드2, 키워드3",
      imgSrc: blankImg,
      add: "추가하기",
      rate: "4.5",
    },
    {
      index: 5,
      title: "레크레이션 5",
      keywords: "키워드1, 키워드2, 키워드3",
      imgSrc: blankImg,
      add: "추가하기",
      rate: "4.5",
    },
    {
      index: 6,
      title: "레크레이션 6",
      keywords: "키워드1, 키워드2, 키워드3",
      imgSrc: blankImg,
      add: "추가하기",
      rate: "4.5",
    },
    {
      index: 7,
      title: "레크레이션 7",
      keywords: "키워드1, 키워드2, 키워드3",
      imgSrc: blankImg,
      add: "추가하기",
      rate: "4.5",
    },
    {
      index: 8,
      title: "레크레이션 8",
      keywords: "키워드1, 키워드2, 키워드3",
      imgSrc: blankImg,
      add: "추가하기",
      rate: "4.5",
    },
    {
      index: 9,
      title: "레크레이션 9",
      keywords: "키워드1, 키워드2, 키워드3",
      imgSrc: blankImg,
      add: "추가하기",
      rate: "4.5",
    },
  ];

  // const handleNextClick = () => {
  //   navigate('/flow/my');
  // };
  const handleBeforeClick = () => {
    navigate('/flow/write/recommend');
  };

  const handleFlowTitleChange = (e) => {
    // 사용자 입력이 변경될 때마다 flowTitle 상태 업데이트
    setFlowTitle(e.target.value);
  };

    return (
        <FlowWriteWrap>
          {modal && modal}
          <ProgressbarStyle>
            <ProgressBarItem>
              <img src={write1} alt="Write 1" style={{ width: '50px', height: '50px' }} />
              <span>기본정보</span>
              <img src={line} alt="line" style={{ width: '80px', height: '2px' }} />
            </ProgressBarItem>
            <ProgressBarItem>
              <img src={write2} alt="Write 2" style={{ width: '50px', height: '50px' }} />
              <span>세부정보</span>
              <img src={line} alt="line" style={{ width: '80px', height: '2px' }} />
            </ProgressBarItem>
            <ProgressBarItem>
              <img src={write3} alt="Write 3" style={{ width: '50px', height: '50px' }} />
              <span>추천 플로우</span>
              <img src={line} alt="line" style={{ width: '80px', height: '2px' }} />
            </ProgressBarItem>
            <ProgressBarItem>
            <img src={writeSelect4} alt="Write Select 4" style={{ width: '50px', height: '50px' }} />
              <span style={{ color: '#19297C' }}>플로우 내용</span>
            </ProgressBarItem>
          </ProgressbarStyle>
          <FlowwriteContent>
            <div>
            <FlowInfoContainer>
              <FlowInfoBox>
                <ContentSelect>
                    <div style={{ marginLeft: "38px"}}>레크레이션 선택</div>
                </ContentSelect>
                <ContentSelectDetail>
                    추천 레크레이션
                </ContentSelectDetail>
                <RecommendRecreation content={recreationData} />
                <ContentSelectDetail>
                    즐겨찾는 레크레이션
                </ContentSelectDetail>
                <RecommendRecreation content={recreationData} /> {/* 컴포넌트 수정 예정 */}
              </FlowInfoBox>
            </FlowInfoContainer>

            <FlowInfoContainer>
              <FlowInfoBox>
                <ContentInfo>
                  <div>기본정보</div>
                  <div>세부정보</div>
                </ContentInfo>
                <ContentInfoDetail>
                  <div style={{ marginLeft: "20px", marginTop: "56px" }}>
                    <div style={{ display: "flex", marginBottom: "8px" }}>
                      <div style={{ marginRight: "8px", fontSize: "16px", fontStyle: "normal", fontWeight: "600" }}>목적</div>
                      <div>회사 워크샵</div>
                    </div>
                    <div style={{ display: "flex" }}>
                      <div style={{ marginRight: "8px", fontSize: "16px", fontStyle: "normal", fontWeight: "600" }}>
                        플레이 시간
                      </div>
                      <div>90분</div>
                    </div>
                  </div>

                  <Line></Line>

                  <div style={{ marginTop: "29px" }}>
                    <div style={{ display: "flex", marginBottom: "8px" }}>
                      <div style={{ marginRight: "8px", fontSize: "16px", fontStyle: "normal", fontWeight: "600" }}>
                        키워드
                      </div>
                      <div style={{ marginRight: "8px" }}>키워드 1</div>
                      <div style={{ marginRight: "8px" }}>키워드 2</div>
                      <div>키워드 3</div>
                    </div>
                    <div style={{ display: "flex", marginBottom: "8px" }}>
                      <div style={{ marginRight: "8px", fontSize: "16px", fontStyle: "normal", fontWeight: "600" }}>성별</div>
                      <div>여성, 남성</div>
                    </div>
                    <div style={{ display: "flex", marginBottom: "8px" }}>
                      <div style={{ marginRight: "8px", fontSize: "16px", fontStyle: "normal", fontWeight: "600" }}>
                        연령대
                      </div>
                      <div>30대, 40대</div>
                    </div>
                    <div style={{ display: "flex", marginBottom: "8px" }}>
                      <div style={{ marginRight: "8px", fontSize: "16px", fontStyle: "normal", fontWeight: "600" }}>인원</div>
                      <div>40명</div>
                    </div>
                  </div>
                </ContentInfoDetail>

                <ContentTitle>
                  <div style={{ marginLeft: "38px" }}>일정플로우 제목</div>
                </ContentTitle>

                {/* ContentTitleInput에서 플로우 제목을 입력받음 */}
                <ContentTitleInput
                  type="text"
                  placeholder="일정플로우의 제목을 입력해주세요."
                  value={flowTitle}
                  onChange={handleFlowTitleChange}
                />

                <FlowContainer>
                  <div style={{ width: "393px", textAlign: "center" }}>
                    {/* FlowTitle에 상태로부터 받은 값을 전달 */}
                    <FlowTitle>{flowTitle || "플로우 제목"}</FlowTitle>
                  </div>

                  {/* 레크레이션 박스 */}
                  <WriteRecreationInfo time={time} num={1} />
                  <WriteRecreationInfo time={time} num={2} />
                  <WriteRecreationInfo time={time} num={3} />
                  <WriteRecreationInfo time={time} num={4} />
                  <WriteRecreationInfo time={time} num={5} />

                  <AddFlowButton>
                    +
                  </AddFlowButton>
                </FlowContainer>
              </FlowInfoBox>
            </FlowInfoContainer>

              <LastButton onClick={handleBeforeClick}>
                이전으로
              </LastButton>
              <SaveButton onClick={handleNextClick}>
                저장하기
              </SaveButton>

            </div>
          </FlowwriteContent>
        </FlowWriteWrap>
      );
}

const FlowWriteWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background-color: #F7F8F9;
`;

const ProgressbarStyle = styled.div`
  width: 1356px;
  height: 156px;
  background-color: #FFF;
  border: 0.5px solid #CACDD2;
  border-radius: 20px;
  display: flex;
  margin-bottom: 33px;
  justify-content: center;
  align-items: center;
  margin-top: 38px;
`;

const ProgressBarItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  img {
    margin-right: 10px;
    margin-left: 10px;
  }

  span {
    color: #CACDD2;
    font-size: 24px;
    font-weight: 700;
  }
`;

const FlowwriteContent = styled.div`
  width: 1356px;
  background-color: #FFF;
  border: 0.5px solid #CACDD2;
  border-radius: 20px;
  display: flex;
  flex-direction: row;
  margin-bottom: 45px;
  padding-bottom: 57px;
`;

const ContentBase = styled.div`
  height: 83px;
  border-radius: 20px;
  border: 1px solid #cacdd2;
  background: white;
  display: flex;
  align-items: center;
  margin-bottom: 13px;
  gap: 225px;
  font-size: 24px;
  font-weight: 700;
`;

const ContentSelect = styled(ContentBase)`
  width: 606px;
  margin-left: 40px;
`;

const ContentInfo = styled(ContentBase)`
  width: 608px;
  flex-grow: 1;
  margin-left: 20px;
  justify-content: center;
`;

const ContentTitle = styled(ContentBase)`
  width: 608px;
  margin-left: 20px;
  margin-top: 30px;
`;

const FlowInfoContainer = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
  margin-left: 28px;
  width: 608px;
`;

const FlowInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContentSelectDetail = styled.div`
  width: 608px;
  height: 51px;
  border-radius: 20px;
  background: #F7F8F9;
  margin-left: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: 700;
`;

const ContentInfoDetail = styled.div`
  width: 608px;
  height: 158px;
  border-radius: 20px;
  background: #F7F8F9;
  margin-left: 20px;
  display: flex;
`;

const ContentTitleInput = styled.input`
  width: 608px;
  height: 51px;
  border-radius: 20px;
  border: none;
  outline: none;
  background: #F7F8F9;
  margin-left: 20px;
  margin-bottom: 120px;
  padding-left: 18px;
  display: flex;
  align-items: center;
  font-size: 20px;
  font-weight: 400;

  &::placeholder {
    color: #9FA4A9;
  }

  &:focus::placeholder {
    color: transparent;
  }
`;

const FlowContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px 70px;
  margin-bottom: 40px;
  align-items: flex-start;
  border-radius: 20px;
  border: 0.5px solid #9fa4a9;
  background: white;
`;

const Line = styled.div`
  border: 0.25px solid #cacdd2;
  height: 100px;
  margin-top: 29px;
  margin-left: 169px;
  margin-right: 20px;
`;

const FlowTitle = styled.div`
  margin-bottom: 59px;
  font-size: 24px;
  font-weight: 700;
`;

const AddFlowButton = styled.button`
  width: 246px;
  height: 53px;
  box-shadow: 0px 0px 20px 0px rgba(27, 29, 31, 0.15);
  border: none;
  border-radius: 20px;
  margin-top: 59px;
  margin-left: 75px;
  margin-bottom: 29px;
  font-size: 30px;
  background-color: #F7F8F9;

  &:hover {
    background-color: #5950ED;
    color: #fff;
    box-shadow: 0px 0px 20px 0px rgba(27, 29, 31, 0.15);
  }
`;

const LastButton = styled.button`
  width: 138px;
  height: 54px;
  color: #464C52;
  background-color: #fff;
  border: 1px solid #464C52;
  border-radius: 50px;
  font-size: 19px;
  font-weight: 700;
  cursor: pointer;
  margin-left: 510px;
  margin-top: 87px;

  /* 선택적으로 hover 효과 추가 */
  &:hover {
    background-color: #F7F8F9; /* hover 시의 배경색 변경 */
  }
`;

const SaveButton = styled.button`
  width: 138px;
  height: 54px;
  background-color: #4036ED;
  border: none;
  border-radius: 50px;
  font-size: 19px;
  font-weight: 700;
  color: #fff;
  cursor: pointer;
  margin-left: 60px;

  /* 선택적으로 hover 효과 추가 */
  &:hover {
    background-color: #3530ED; /* hover 시의 배경색 변경 */
  }
`;