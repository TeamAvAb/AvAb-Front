import React, { useState } from "react";
import styled from "styled-components";
import Dropdown from "./Dropdown";
import searchIconImg from "../../assets/main/searchIcon.svg";
import keywordImg from "../../assets/main/checkIcon.svg";
import none from '../../assets/Footer/none.png'

export default function Search({ keywordModal, purposeModal }) {
  const [menu, setMenu] = useState(false);
  const time = [10, 20, 30, 40, 50, 60];

  return (
    <SearchEngine>
      <SearchWordBox>
        <SearchWord placeholder="오늘 MT 레크레이션 할 때 뭐하지?" />
        <SearchIcon src={searchIconImg} />
      </SearchWordBox>
      <SearchBox menu={menu}>
        <Filters menu={menu}>
          <Filter>
            <LabelName htmlFor="keyword">키워드</LabelName>
            <KeywordBox id="keyword" onClick={() => keywordModal(true)}>
              <img src={keywordImg} style={{ width: "24px", height: "24px" }} />
              클릭하면 키워드 선택창이 나와요!
            </KeywordBox>
          </Filter>
          <Filter>
            <LabelName htmlFor="personnel">인원</LabelName>
            <Input placeholder="조별 인원을 입력해주세요."></Input>
          </Filter>
          <Filter>
            <LabelName htmlFor="playtime">진행 시간</LabelName>
            <Dropdown list={time} />
          </Filter>
          <Filter>
            <LabelName htmlFor="place">장소</LabelName>
            <Options>
              <Option>
                <OptionCheck type="radio" />
                <OptionText>실내</OptionText>
              </Option>
              <Option>
                <OptionCheck type="radio" />
                <OptionText>실외</OptionText>
              </Option>
            </Options>
          </Filter>
          <MiddleLine/>
          <Filter>
                <LabelName htmlFor="purpose">목적</LabelName>
                <KeywordBox id="purpose" onClick={() => purposeModal(true)}>
                  <img
                    src={keywordImg}
                    style={{ width: "24px", height: "24px" }}
                  />
                  클릭하면 목적 선택창이 나와요!
                </KeywordBox>
              </Filter>
              <Filter>
                <LabelName htmlFor="sex">성별</LabelName>
                <Options>
                  <Option>
                    <OptionCheck type="radio" />
                    <OptionText>여성</OptionText>
                  </Option>
                  <Option>
                    <OptionCheck type="radio" />
                    <OptionText>남성</OptionText>
                  </Option>
                </Options>
              </Filter>
              <Filter>
                <LabelName htmlFor="age">연령대</LabelName>
                <Options>
                  <Option long={true}>
                    <OptionCheck type="radio" />
                    <OptionText>10대 미만</OptionText>
                  </Option>
                  <Option>
                    <OptionCheck type="radio" />
                    <OptionText>10대</OptionText>
                  </Option>
                  <Option>
                    <OptionCheck type="radio" />
                    <OptionText>20대</OptionText>
                  </Option>
                  <Option>
                    <OptionCheck type="radio" />
                    <OptionText>30대</OptionText>
                  </Option>
                  <Option>
                    <OptionCheck type="radio" />
                    <OptionText>40대</OptionText>
                  </Option>
                  <Option>
                    <OptionCheck type="radio" />
                    <OptionText>50대 이상</OptionText>
                  </Option>
                </Options>
              </Filter>
        </Filters>
      </SearchBox>
      <NoneImage src={none}/>
      <SearchBtns>
        <ResetBtn>초기화</ResetBtn>
        <SearchBtn>필터 적용</SearchBtn>
      </SearchBtns>
    </SearchEngine>
  );
}

// 스타일링
const SearchEngine = styled.div`
  width: 958px;
  /* padding: 0 4px; */
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const NoneImage = styled.img`
  position: absolute;
  width: 235px;
  margin-left: 1120px;
  margin-top: 130px;
`;
// 메인 검색어 input
const SearchWordBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: -89.998px;
  width: 515.413px;
  height: 68.898px;
  box-shadow: 0px 0px 20px 0px rgba(27, 29, 31, 0.15);
  border-radius: 50px;
  background: #fff;
`;
const SearchWord = styled.input`
  width: 386px;
  height: 50px;
  display: inline-flex;
  padding: 9px 17px;
  align-items: center;
  gap: 48px;
  background: #fff;
  color: var(--gray-scale-9-fa-4-a-9, #9fa4a9);
  font-size: 20px;
  transition: max-height 0.3s ease-out;
  border: 0;
`;
const SearchIcon = styled.img`
  position: absolute;
  right: 22.52px;
  z-index: 1;
`;

// 필터링 박스
const SearchBox = styled.div`
  width: 958px;
  height: 519px;
  position: relative;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  border-radius: 20px;
  /* padding: 26px 47px ${(props) => (props.menu ? "46px" : "26px")} 26px; */
  background: var(--main-d-9-d-9-d-9, #19297c);
  box-shadow: 0px 15px 20px 0px rgba(27, 29, 31, 0.2);
  margin-bottom: 30px;
  padding-bottom: 10px;
`;

// 필터 설정 박스
const Filters = styled.div`
  /* position: absolute;
  top: 52px;
  left: 40px; */
  width: 885px;
  margin: 26px 47px ${(props) => (props.menu ? "46px" : "26px")} 26px;
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 22px;
`;
const Filter = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  color: #fff;
  font-size: 20px;
  font-weight: 700;
`;
const MiddleLine = styled.hr`
  width: 200px;
`;
const LabelName = styled.label`
  width: 117px;
`;
const KeywordBox = styled.div`
  width: 769px;
  height: 44px;
  border-radius: 50px;
  background: #fff;
  color: var(--gray-scale-9-fa-4-a-9, #9fa4a9);
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
  padding-left: 20.5px;
  box-sizing: border-box;
`;

const Input = styled.input`
  width: 230px;
  height: 44px;
  border-radius: 50px;
  background: #fff;
  border: none;
  color: var(--gray-scale-9-fa-4-a-9, #9fa4a9);
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  padding-left: 21px;
`;

const Options = styled.div`
  display: flex;
  flex-direction: row;
  gap: 30px;
`;
const Option = styled.div`
  width: max-content;
  height: 43px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  box-sizing: border-box;
  padding: 12px 30px;
  background: #fff;
  color: var(--gray-scale-9-fa-4-a-9, #9fa4a9);
  text-align: center;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
`;
const OptionCheck = styled.input.attrs({ type: "radio" })`
  opacity: 0;
  position: absolute;
  visibility: hidden;
`;
const OptionText = styled.span`
  color: var(--gray-scale-9-fa-4-a-9, #9fa4a9);
  text-align: center;
  font-size: 16px;
`;
// 버튼
const SearchBtns = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
  gap: 39px;
  position: absolute;
  bottom: -60px;
  right: 0;
`;
const ResetBtn = styled.button`
  display: flex;
  padding: 9px 24px;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  border: 1px solid var(--gray-scale-1-b-1-d-1-f, #1b1d1f);
  background: var(--gray-scale-f-7-f-8-f-9, #f7f8f9);
  color: var(--gray-scale-1-b-1-d-1-f, #1b1d1f);
  font-size: 20px;
  font-weight: 700;
`;
const SearchBtn = styled.button`
  display: flex;
  padding: 9px 24px;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  border: 1px solid var(--gray-scale-1-b-1-d-1-f, #1b1d1f);
  background: var(--gray-scale-1-b-1-d-1-f, #1b1d1f);
  color: #fff;
  font-size: 20px;
  font-weight: 700;
`;
