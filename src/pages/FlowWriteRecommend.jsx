import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import write1 from '../assets/flowwrite/write_1.png';
import write2 from '../assets/flowwrite/write_2.png';
import writeSelect3 from '../assets/flowwrite/write_select_3.png';
import write4 from '../assets/flowwrite/write_4.png';
import line from '../assets/flowwrite/line.png';
import fast from '../assets/flowwrite/fast.png';
import RecreationInfo from "../components/flowwrite/RecommendFlowInfo";
import axios from "axios";
import imgGo4 from '../assets/flowwrite/ImgGo4.png'

export default function FlowWriteRecommend() {
  const navigate = useNavigate();
  const [selectedButton, setSelectedButton] = useState(null);
  const [flowData, setFlowData] = useState([]);
  const [playTime, setPlayTime] = useState(''); 
  const [selectedKeywords, setSelectedKeywords] = useState([]);

  const keywordMappings = {
    WORKSHOP: "워크샵",
    SPORTS_DAY: "체육대회",
    MT: "MT",
    GATHERING: "모임",
    RETREAT: "수련회",
  };

  // 로컬 스토리지에서 값 가져오기
  useEffect(() => {
    const savedPlayTime = localStorage.getItem("playTime");
    if (savedPlayTime) {
      setPlayTime(savedPlayTime);
      console.log('Parsed Play Time:', savedPlayTime); // 값 확인
    }

    const savedKeywords = localStorage.getItem("selectedKeywords");
    if (savedKeywords) {
      const parsedKeywords = JSON.parse(savedKeywords);
      console.log('Parsed Keywords:', parsedKeywords); // 값 확인
      const englishKeywords = parsedKeywords.map(
        (keyword) => Object.keys(keywordMappings).find(key => keywordMappings[key] === keyword) || keyword // 키워드를 영어로 변환
      );
      setSelectedKeywords(englishKeywords);
    }
  }, []); // 컴포넌트가 처음 마운트될 때만 실행



  // 플로우 데이터 가져오기
  useEffect(() => {
    const fetchFlowData = async () => {
      console.log('Checking play time and keywords...'); // 상태 확인 로그
      console.log('Play Time:', playTime); // 상태 확인
      console.log('Selected Keywords:', selectedKeywords); // 상태 확인

      // 상태가 비어 있는 경우 로그 출력 후 함수 종료
      if (!playTime || selectedKeywords.length === 0) {
        console.log('Play time or keywords are empty.'); // 상태가 비어 있을 때 로그
        return; // 함수 종료
      }

      console.log('Fetching flow data...'); // API 호출 준비 로그
      try {
        const response = await axios.get(`https://dev.avab.shop/api/flows/recommended`, {
          params: {
            playTime: playTime, // 플레이 시간 사용
            purpose: selectedKeywords.join(','),
          },
        });
        console.log(response.data); // API 응답 확인
        
        if (response.data.result) {
          // playTime과 totalPlayTime이 같은 플로우만 필터링
          const validFlowData = response.data.result.filter(flow => flow.flowDetail.totalPlayTime === parseInt(playTime));
          setFlowData(validFlowData);
          
          if (validFlowData.length === 0) {
            console.warn("No flow data found that matches the exact play time.");
          }
        } else {
          console.warn("No result found in API response.");
        }
      } catch (error) {
        console.error("API Error:", error);
      }
    };

    fetchFlowData();
  }, [playTime, selectedKeywords]); // 상태가 변경될 때마다 호출

  const handleNextClick = () => {
    navigate('/flow/write/content');
    window.scrollTo({ top: 0, behavior: 'smooth' }); // 화면 스크롤 최상단으로 이동
  };
  const handleBeforeClick = () => {
    navigate('/flow/write/detail');
    window.scrollTo({ top: 0, behavior: 'smooth' }); // 화면 스크롤 최상단으로 이동
  };

  const handleButtonClick = (button) => {
    if (selectedButton === button) {
      setSelectedButton(null);
      localStorage.removeItem('selectedFlow'); // 선택 해제 시 로컬 스토리지에서 삭제
      console.log(`Button ${button} deselected`);
    } else {
      setSelectedButton(button);

      // 버튼 값에 따라 flowData에서 데이터를 찾기
      const index = button === '1안' ? 0 : 1; // 버튼 값에 따라 인덱스 결정
      const selectedFlowData = flowData[index]; // 해당 인덱스의 flowData를 가져옴

      if (selectedFlowData) {
        localStorage.setItem('selectedFlow', JSON.stringify(selectedFlowData)); // 선택된 플로우 데이터를 로컬 스토리지에 저장
        console.log(`Selected flow data:`, selectedFlowData); // 저장하는 데이터 확인
        console.log(`Button clicked: ${button}, Selected Flow Data:`, selectedFlowData);
      } else {
        console.warn(`No flow data found for button: ${button}`); // 데이터가 없을 경우 경고
      }
    }
  };

  // useEffect(() => {
  //   const fetchFlowData = async () => {
  //     try {
  //       const response = await axios.get(`https://dev.avab.shop/api/flows/recommended`, {
  //          params: {
  //           playTime: '100',
  //           purpose: 'WORKSHOP'
  //         }
  //       });
  //       setFlowData(response.data.result);
  //       console.log(response.data.result); // 데이터 구조 확인
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   fetchFlowData();
  // }, []);

  // useEffect(() => {
  //   console.log(flowData);
  // }, [flowData]);

    return (
        <FlowWriteRecommendWrap>
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
              <img src={writeSelect3} alt="Write Select 3" style={{ width: '50px', height: '50px' }} />
              <span style={{ color: '#19297C' }}>추천 플로우</span>
              <img src={line} alt="line" style={{ width: '80px', height: '2px' }} />
            </ProgressBarItem>
            <ProgressBarItem>
            <img src={write4} alt="Write 4" style={{ width: '50px', height: '50px' }} />
              <span>플로우 내용</span>
            </ProgressBarItem>
          </ProgressbarStyle>
          <FlowwriteRecommend>
            <div>
            <AdditionalExplain>
              <span>입력한 내용을 기반으로 한 추천 플로우입니다. 저장하고 싶은 플로우를 <strong>클릭</strong>하여 저장해주세요.</span>
            </AdditionalExplain>
            <RecommendWrapper>
            <Recommend1 selected={selectedButton === '1안'}>
              <Select1Button
                onClick={() => handleButtonClick('1안')}
                clicked={selectedButton === '1안'}
              >
                1안
              </Select1Button>
              <div style={{ width: "393px", textAlign: "center" }}>
                <FlowTitle>{flowData.length > 0 ? flowData[0].flowDetail.title : "title"}</FlowTitle>
              </div>
              <RecreationBox>
                {flowData.length > 0 && <RecreationInfo recreations={flowData[0].recreations} />}
              </RecreationBox>
            </Recommend1>
            <Recommend2 selected={selectedButton === '2안'}>
              <Select2Button
                onClick={() => handleButtonClick('2안')}
                clicked={selectedButton === '2안'}
              >
                2안
              </Select2Button>
              <div style={{ width: "393px", textAlign: "center" }}>
                <FlowTitle>{flowData.length > 1 ? flowData[1].flowDetail.title : "title"}</FlowTitle>
              </div>
              <RecreationBox>
                {flowData.length > 1 && <RecreationInfo recreations={flowData[1].recreations} />}
              </RecreationBox>
            </Recommend2>
          </RecommendWrapper>

            <CardGoContent onClick={handleNextClick}>
                <CardGoContainer>
                <CardGoTextContainer>
                <CardGo4Text>바로 플로우 작성하기</CardGo4Text>
                <CardGo4SubText>원하는 플로우를 작성할 수 있도록{'\n'}아브아브가 도와줄게요!</CardGo4SubText>
                </CardGoTextContainer>
                <img src={imgGo4} alt="go 4" style={{ width: '120px', height: '120px' }} />
                <img src={fast} alt="Fast" style={{ width: '44px', height: '44px', marginLeft: '225px'}} />
                </CardGoContainer>
              </CardGoContent>
            <LastButton onClick={handleBeforeClick}>
              이전으로
            </LastButton>
            <NextButton onClick={handleNextClick}>
              다음으로
            </NextButton>
            </div>
          </FlowwriteRecommend>
        </FlowWriteRecommendWrap>
      );
}

const FlowWriteRecommendWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background-color: #f7f8f9;
`;

const ProgressbarStyle = styled.div`
  width: 1356px;
  height: 156px;
  background-color: #fff;
  border: 0.5px solid #cacdd2;
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
    color: #cacdd2;
    font-size: 24px;
  }
`;

const FlowwriteRecommend = styled.div`
  width: 1356px;
  background-color: #fff;
  border: 0.5px solid #cacdd2;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  margin-bottom: 45px;
  justify-content: space-between;
  padding-bottom: 40px;
`;

const AdditionalExplain = styled.div`
  width: 1130px;
  height: 47px;
  border-radius: 50px;
  border: none;
  background-color: #19297c;
  margin-left: 113px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
  margin-bottom: 100px;

  span {
    color: #fff;
    font-size: 16px;
    font-weight: 400;
  }
`;

const RecommendBase = styled.div`
  box-sizing: border-box;
  border-radius: 20px;
  border: ${({ selected }) => (selected ? '2.5px solid #4036ED' : '0.5px solid #9FA4A9')};
  background: #fff;
  display: inline-block;
  align-items: center;
  padding-top: 30px;
  padding-left: 65px;
  padding-bottom: 30px;
  box-shadow: ${({ selected }) => (selected ? '0px 0px 20px 0px rgba(27, 29, 31, 0.15)' : 'none')};
`;

const Select1Button = styled.button`
  position: relative;
  width: 89px;
  height: 29px;
  background-color: ${({ clicked }) => (clicked ? '#4036ED' : '#fff')};
  border: 0.5px solid #1b1d1f;
  border-radius: 50px;
  font-size: 20px;
  font-weight: 700;
  align-items: center;
  color: ${({ clicked }) => (clicked ? '#fff' : '#1B1D1F')};
  cursor: pointer;
`;

const RecommendWrapper = styled.div`
  display: flex;
  gap: 25px; /* 1안과 2안 사이의 간격 설정 */
`;

const Recommend1 = styled(RecommendBase)`
  width: 552px;
  margin-left: 113px;
  position: relative;
  margin-bottom: 0; 

  ${Select1Button} {
    position: absolute;
    left: 433px;
  }
`;

const Select2Button = styled.button`
  position: relative;
  width: 89px;
  height: 29px;
  background-color: ${({ clicked }) => (clicked ? '#4036ED' : '#fff')};
  border: 0.5px solid #1b1d1f;
  border-radius: 50px;
  font-size: 20px;
  font-weight: 700;
  color: ${({ clicked }) => (clicked ? '#fff' : '#1B1D1F')};
  cursor: pointer;
`;

const Recommend2 = styled(RecommendBase)`
  width: 552px;
  margin-left: 25px;
  position: relative;
  margin-bottom: 0; 

  ${Select2Button} {
    position: absolute;
    left: 433px;
  }
`;

const FlowTitle = styled.div`
  margin-bottom: 59px;
  font-size: 24px;
  font-weight: 700;
`;

const RecreationBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-start;
  margin-bottom: 8px;
`;

const CardGoContent = styled.div`
  width: 805px;
  height: 131px;
  border-radius: 20px;
  border: none;
  background: #ffaa29;
  margin-top: 46px;
  margin-left: 113px;
  align-items: center;
  padding: 39px 30px 39px 295px;
`;

const CardGoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const CardGoTextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const CardGo4Text = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: #000;
  text-align: right;
  margin-bottom: 8px;
  margin-right: 200px;
`;

const CardGo4SubText = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: #000;
  text-align: right;
  white-space: pre-line;
  margin-right: 200px;
`;

const LastButton = styled.button`
  width: 138px;
  height: 54px;
  color: #464c52;
  background-color: #fff;
  border: 1px solid #464c52;
  border-radius: 50px;
  font-size: 19px;
  font-weight: 700;
  cursor: pointer;
  margin-left: 510px;
  margin-top: 120px;

  /* 선택적으로 hover 효과 추가 */
  &:hover {
    background-color: #f7f8f9; /* hover 시의 배경색 변경 */
  }
`;

const NextButton = styled.button`
  width: 138px;
  height: 54px;
  background-color: #4036ed;
  border: none;
  border-radius: 50px;
  font-size: 19px;
  font-weight: 700;
  color: #fff;
  cursor: pointer;
  margin-left: 60px;

  /* 선택적으로 hover 효과 추가 */
  &:hover {
    background-color: #3530ed; /* hover 시의 배경색 변경 */
  }
`;
