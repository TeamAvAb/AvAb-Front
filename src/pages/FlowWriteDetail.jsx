import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import write1 from '../assets/flowwrite/write_1.png';
import writeSelect2 from '../assets/flowwrite/write_select_2.png';
import write3 from '../assets/flowwrite/write_3.png';
import write4 from '../assets/flowwrite/write_4.png';
import line from '../assets/flowwrite/line.png';
import filter from '../assets/flowwrite/filter.png';

import writeSelect3 from '../assets/flowwrite/write_select_3.png' // 임시 이미지 -> 수정필요
import writeSelect4 from '../assets/flowwrite/write_select_4.png' // 임시 이미지 -> 수정필요

export default function FlowWriteDetail() {
  const navigate = useNavigate();
  const [selectedGenders, setSelectedGenders] = useState([]);
  const [selectedAges, setSelectedAges] = useState([]);
  const ageGroups = ['10대 미만', '10대', '20대', '30대', '40대', '50대 이상'];

  const handleNextClick = () => {
    navigate('/flow/write/recommend');
  };

  const handleBeforeClick = () => {
    navigate('/flow/write');
  };

  const handleGenderClick = (gender) => {
    console.log(`Clicked gender button with value: ${gender}`);
    if (selectedGenders.includes(gender)) {
      // 성별이 이미 선택되었는지 확인
      setSelectedGenders(selectedGenders.filter((selected) => selected !== gender));
    } else {
      // 클릭을 기반으로 선택한 성별 업데이트
      setSelectedGenders([...selectedGenders, gender]);
    }
  };

  const handleAgeClick = (age) => {
    console.log(`Clicked age button with value: ${age}`);
    
    // 연령대가 이미 선택되었는지 확인
    const isAgeSelected = selectedAges.includes(age);
  
    // 클릭을 기반으로 선택한 연령대 업데이트
    if (isAgeSelected) {
      setSelectedAges(selectedAges.filter(selectedAge => selectedAge !== age));
    } else {
      setSelectedAges([...selectedAges, age]);
    }
    // checkAllFields();
  };

    return (
        <FlowWriteWrap>
          <ProgressbarStyle>
            <ProgressBarItem>
              <img src={write1} alt="Write 1" style={{ width: '50px', height: '50px' }} />
              <span>기본정보</span>
              <img src={line} alt="line" style={{ width: '80px', height: '2px' }} />
            </ProgressBarItem>
            <ProgressBarItem>
              <img src={writeSelect2} alt="Write Select 2" style={{ width: '50px', height: '50px' }} />
              <span style={{ color: '#19297C' }}>세부정보</span>
              <img src={line} alt="line" style={{ width: '80px', height: '2px' }} />
            </ProgressBarItem>
            <ProgressBarItem>
              <img src={write3} alt="Write 3" style={{ width: '50px', height: '50px' }} />
              <span>추천 플로우</span>
              <img src={line} alt="line" style={{ width: '80px', height: '2px' }} />
            </ProgressBarItem>
            <ProgressBarItem>
            <img src={write4} alt="Write 4" style={{ width: '50px', height: '50px' }} />
              <span>플로우 내용</span>
            </ProgressBarItem>
          </ProgressbarStyle>
          <FlowwriteDetail>
            <div>
            <AdditionalExplain>
            <span>플로우는 <strong>세부정보</strong>를 입력할수록 <strong>정확한 추천</strong>을 얻을 수 있습니다.</span>
            </AdditionalExplain>
            <TextLine>원하는 키워드를 입력해주세요.</TextLine>
            <KeywordSearch>
              <img src={filter} alt="Filter" style={{ width: '25px', height: '25px' }} />
              <KeywordInput type="text" placeholder="키워드 필터링 검색" style={{ width: '90%', height: '18px'}} />
            </KeywordSearch>
            <TextLine>성별과 연령대를 선택해주세요.</TextLine>
            <SubTextLine>성별</SubTextLine>
            <GenderButton clicked={selectedGenders.includes('F')} onClick={() => handleGenderClick('F')}>
              <span className={`genderBtn ${selectedGenders.includes('F') ? 'clicked' : ''}`}>
                여성
              </span>
            </GenderButton>
            <GenderButton clicked={selectedGenders.includes('M')} onClick={() => handleGenderClick('M')}>
              <span className={`genderBtn ${selectedGenders.includes('M') ? 'clicked' : ''}`}>
                남성
              </span>
            </GenderButton>
            <div>
            <SubTextLine>연령대</SubTextLine>
            {ageGroups.map((age) => (
              <AgeButton key={age} onClick={() => handleAgeClick(age)}>
                <AgeSpan clicked={selectedAges.includes(age)}>{age}</AgeSpan>
              </AgeButton>
            ))}
            </div>
            <TextLine>레크레이션에 참여하는 총 인원을 선택해주세요.</TextLine>
            <JoinPeople></JoinPeople>
            <CardContainer>
              <CardGoRecommend>
              <CardGoContainer>
                <img src={writeSelect3} alt="go 3" style={{ width: '120px', height: '120px' }} />
                <CardGoTextContainer>
                <CardGo3Text>추천 플로우 확인하기</CardGo3Text>
                <CardGo3SubText>입력한 정보를 바탕으로{'\n'}아브아브가 추천한 플로우예요!</CardGo3SubText>
                </CardGoTextContainer>
               </CardGoContainer>
              </CardGoRecommend>
              <CardGoContent>
                <CardGoContainer>
                <CardGoTextContainer>
                <CardGo4Text>바로 플로우 작성하기</CardGo4Text>
                <CardGo4SubText>원하는 플로우를 작성할 수 있도록{'\n'}아브아브가 도와줄게요!</CardGo4SubText>
                </CardGoTextContainer>
                <img src={writeSelect4} alt="go 4" style={{ width: '120px', height: '120px' }} />
                </CardGoContainer>
              </CardGoContent>
            </CardContainer>
            <LastButton onClick={handleBeforeClick}>
              이전으로
            </LastButton>
            <NextButton onClick={handleNextClick}>
              다음으로
            </NextButton>
            </div>
          </FlowwriteDetail>
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

const FlowwriteDetail = styled.div`
  width: 1356px;
  height: 1156px;
  background-color: #FFF;
  border: 0.5px solid #CACDD2;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  margin-bottom: 45px;
`;

const AdditionalExplain = styled.div`
  width: 1130px;
  height: 47px;
  border-radius: 50px;
  border: none;
  background-color: #19297C;
  margin-left: 113px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 40px;

  span {
    color: #fff;
    font-size: 16px;
    font-weight: 400;
  }

  strong {
    font-weight: 700;
  }
`;

const TextLine = styled.div`
  color: #000;
  font-size: 24px;
  line-height: 1.5;
  margin-left: 116px;
  margin-top: 40px;
  margin-bottom: 21px;
  font-weight: 700;
`;

const KeywordSearch = styled.div`
  width: 808px;
  height: 63px;
  border-radius: 20px;
  border: 0.5px solid #9FA4A9;
  background: #FFF;
  margin-left: 116px;
  display: flex;
  align-items: center;

  img {
    margin-left: 13px;
  }
`;

const KeywordInput = styled.input`
  width: 90%;
  height: 18px;
  margin-left: 8px;
  border: none;
  outline: none;

  &::placeholder {
    color: #9FA4A9;
  }

  &:focus::placeholder {
    color: transparent;
  }
`;

const SubTextLine = styled.span`
  color: #464C52;
  font-size: 20px;
  margin-left: 116px;
  margin-right: 31px;
  font-weight: 700;
`;

const GenderButton = styled.span`
  width: 85px;
  height: 44px;
  border-radius: 50px;
  border: 0.5px solid #9FA4A9;
  background-color: ${({ clicked }) => (clicked ? '#B1BEFF' : '#fff')};
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  display: inline-block;
  margin-left: 21px;
  color: ${({ clicked }) => (clicked ? '#1B1D1F' : '#9FA4A9')};
  font-size: 20px;
  font-weight: 700;
  padding-top: 18px;
  padding-left: 45px; 
  cursor: pointer;
`;

const AgeButton = styled.div`
  display: inline-block;
  margin-top: 21px;
`;

const AgeSpan = styled.span`
  display: inline-flex;
  padding: 16px 34px;
  border-radius: 50px;
  border: 0.5px solid #9FA4A9;
  background-color: ${({ clicked }) => (clicked ? '#B1BEFF' : '#fff')};
  justify-content: center;
  align-items: center;
  display: flex;
  margin-left: 21px;
  color: ${({ clicked }) => (clicked ? '#1B1D1F' : '#9FA4A9')};
  font-size: 20px;
  font-weight: 700;
  cursor: pointer;
`;

const JoinPeople = styled.div`
  width: 161px;
  height: 63px;
  border-radius: 20px;
  border: 0.5px solid #9FA4A9;
  background: #FFF;
  margin-left: 116px;
`;

const CardContainer = styled.div`
  display: flex;
`;

const CardGoRecommend = styled.div`
  width: 372px;
  height: 129px;
  padding: 40px 90px;
  border-radius: 20px;
  border: none;
  background: #A0DDFF;
  margin-top: 40px;
  margin-left: 113px;
  align-items: center;
`;

const CardGoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const CardGoTextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const CardGo3Text = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: #000;
  text-align: left;
  margin-bottom: 8px;
  margin-left: 50px;
`;

const CardGo3SubText = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: #000;
  text-align: left;
  white-space: pre-line;
  margin-left: 50px;
`;

const CardGoContent = styled.div`
  width: 372px;
  height: 129px;
  padding: 40px 90px;
  border-radius: 20px;
  border: none;
  background: #FFAA29;
  margin-top: 40px;
  margin-left: 26px;
  align-items: center;
`;

const CardGo4Text = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: #000;
  text-align: right;
  margin-bottom: 8px;
  margin-right: 50px;
`;

const CardGo4SubText = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: #000;
  text-align: right;
  white-space: pre-line;
  margin-right: 50px;
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
  margin-top: 121px;

  /* 선택적으로 hover 효과 추가 */
  &:hover {
    background-color: #F7F8F9; /* hover 시의 배경색 변경 */
  }
`;

const NextButton = styled.button`
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