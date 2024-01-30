import React, { useEffect, useState } from "react";
import styled from "styled-components";

import KeywordModal from "./KeywordModal";
import Dropdown from "./Dropdown";
import RadioInput from "./RadioInput";

import searchIconImg from "../../assets/main/searchIcon.svg";
import keywordImg from "../../assets/main/checkIcon.svg";
import hrImg from "../../assets/main/hr.svg";
import deleteImg from "../../assets/main/deleteIcon.svg";
import arrowDownImg from "../../assets/main/arrowDownIcon.svg";
import arrowUpImg from "../../assets/main/arrowUpIcon.svg";

export default function Search({}) {
  // 검색어 및 키워드 저장
  const [searchWord, setSearchWord] = useState();
  const [keyword, setKeyword] = useState([]);
  const [personnel, setPersonnel] = useState();
  const [time, setTime] = useState("10");
  const [place, setPlace] = useState([]);
  const [purpose, setPurpose] = useState([]);
  const [sex, setSex] = useState([]);
  const [age, setAge] = useState([]);

  // 더미 데이터
  const timeOptions = [10, 20, 30, 40, 50, 60];
  const placeOptions = [
    { id: 1, value: "실내" },
    { id: 2, value: "실외" },
  ];
  const sexOptions = [
    { id: 1, value: "여성" },
    { id: 2, value: "남성" },
  ];
  const ageOptions = [
    { id: 1, value: "10대 미만" },
    { id: 2, value: "10대" },
    { id: 3, value: "20대" },
    { id: 4, value: "30대" },
    { id: 5, value: "40대" },
    { id: 6, value: "50대 이상" },
  ];
  const keywordOptions = [
    { id: 1, title: "협동" },
    { id: 2, title: "센스" },
    { id: 3, title: "순발력" },
    { id: 4, title: "두뇌" },
    { id: 5, title: "두뇌" },
    { id: 6, title: "두뇌" },
    { id: 7, title: "두뇌" },
    { id: 8, title: "두뇌" },
  ];
  const purposeOptions = [
    { id: 1, title: "MT" },
    { id: 2, title: "워크샵" },
    { id: 3, title: "야유회" },
    { id: 4, title: "새내기배움터" },
    { id: 5, title: "송년회" },
    { id: 6, title: "신년회" },
  ];

  // 필터 더보기 메뉴
  const [menu, setMenu] = useState(false);
  const openMenu = () => {
    setMenu(!menu);
  };

  const onRemove = (id) => {
    setKeyword(
      keyword.filter((el) => {
        return el !== id;
      })
    );
  };

  // 모달창
  const [keywordModal, setKeywordModal] = useState(false);
  const [purposeModal, setPurposeModal] = useState(false);

  const renderKeyword = (label, selected) => {
    return selected.map((el) => (
      <>
        <SelectedKeyword key={el}>
          '{label[el - 1].title}' 포함
          <img
            src={deleteImg}
            id={el}
            style={{ width: "15px", height: "15px" }}
            onClick={(e) => {
              e.stopPropagation();
              onRemove(el);
            }}
          />
        </SelectedKeyword>
      </>
    ));
  };

  // 초기화 함수
  const reset = () => {
    setSearchWord([]);
    setKeyword([]);
    setPersonnel("");
    setTime(10);
    setPlace([]);
    setPurpose([]);
    setSex([]);
    setAge([]);
  };

  return (
    <SearchEngine>
      {/* 전체 검색어 */}
      <SearchWordBox>
        <SearchWord
          placeholder="오늘 MT 레크레이션 할 때 뭐하지?"
          onChange={(e) => setSearchWord(e.target.value)}
          value={searchWord}
        />
        <img
          src={searchIconImg}
          style={{ width: "42.399px", height: "42.399px" }}
        />
      </SearchWordBox>
      <SearchBox>
        <Filters menu={menu}>
          {/* 키워드 */}
          <Filter>
            <LabelName htmlFor="keyword">키워드</LabelName>
            <KeywordBox id="keyword" onClick={() => setKeywordModal(true)}>
              <img src={keywordImg} style={{ width: "20px", height: "20px" }} />
              {keyword.length === 0 ? (
                "클릭하면 키워드 선택창이 나와요!"
              ) : (
                <SelectedKeywords>
                  {renderKeyword(keywordOptions, keyword)}
                </SelectedKeywords>
              )}
            </KeywordBox>
          </Filter>

          {/* 인원 */}
          <Filter>
            <LabelName htmlFor="personnel">인원</LabelName>
            <Input
              placeholder="조별 인원을 입력해주세요."
              type="number"
              onChange={(e) => setPersonnel(e.target.value)}
              value={personnel}
            ></Input>
          </Filter>

          {/* 진행 시간*/}
          <Filter>
            <LabelName htmlFor="playtime">진행 시간</LabelName>
            <Dropdown
              list={timeOptions}
              setOption={setTime}
              selectedOption={time}
            />
          </Filter>

          {/* 장소 */}
          <Filter>
            <LabelName htmlFor="place">장소</LabelName>
            <RadioInput
              content={placeOptions}
              setOption={setPlace}
              selectedOption={place}
            />
          </Filter>
        </Filters>
        <Filters>
          <More isOpen={menu}>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <img src={hrImg} />
            </div>

            {/* 목적 */}
            <Filter>
              <LabelName htmlFor="purpose">목적</LabelName>
              <KeywordBox id="purpose" onClick={() => setPurposeModal(true)}>
                <img
                  src={keywordImg}
                  style={{ width: "20px", height: "20px" }}
                />
                {purpose.length === 0 ? (
                  "클릭하면 목적 선택창이 나와요!"
                ) : (
                  <SelectedKeywords>
                    {renderKeyword(purposeOptions, purpose)}
                  </SelectedKeywords>
                )}
              </KeywordBox>
            </Filter>

            {/* 성별 */}
            <Filter>
              <LabelName htmlFor="sex">성별</LabelName>
              <RadioInput
                content={sexOptions}
                setOption={setSex}
                selectedOption={sex}
              />
            </Filter>

            {/* 연령대 */}
            <Filter last={true}>
              <LabelName htmlFor="age">연령대</LabelName>
              <RadioInput
                content={ageOptions}
                setOption={setAge}
                selectedOption={age}
              />
            </Filter>
          </More>
        </Filters>
        <Menu onClick={openMenu}>
          {menu ? (
            <>
              필터 접기
              <img style={{ width: "24px", height: "24px" }} src={arrowUpImg} />
            </>
          ) : (
            <>
              필터 더보기
              <img
                style={{ width: "24px", height: "24px" }}
                src={arrowDownImg}
              />
            </>
          )}
        </Menu>
      </SearchBox>
      <SearchBtns>
        <ResetBtn onClick={reset}>초기화</ResetBtn>
        <SearchBtn>필터 적용</SearchBtn>
      </SearchBtns>
      {keywordModal ? (
        <KeywordModal
          content={keywordOptions}
          modalControl={setKeywordModal}
          keywordControl={setKeyword}
          selectedOption={keyword}
        />
      ) : null}
      {purposeModal ? (
        <KeywordModal
          content={purposeOptions}
          modalControl={setPurposeModal}
          keywordControl={setPurpose}
          selectedOption={purpose}
        />
      ) : null}
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
  color: var(--gray-scale-464-c-52, #464c52);
  font-size: 20px;
  transition: max-height 0.3s ease-out;
  border: 0;
`;

// 필터링 박스
const SearchBox = styled.div`
  width: 957px;
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  background: var(--main-d-9-d-9-d-9, #19297c);
  box-shadow: 0px 15px 20px 0px rgba(27, 29, 31, 0.2);
  margin-bottom: 14.73px;
`;

// 필터 설정 박스
const Filters = styled.div`
  width: 885px;
  margin: 26px 47px 0 26px;
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 22px;
`;

const Filter = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: ${(props) => (props.last ? "46px" : 0)};
  color: #fff;
  font-size: 20px;
  font-weight: 700;
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

const SelectedKeywords = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const SelectedKeyword = styled.div`
  display: inline-flex;
  padding: 2px 10px;
  flex-direction: row;
  gap: 12px;
  align-items: center;
  border-radius: 20px;
  color: var(--gray-scale-1-b-1-d-1-f, #1b1d1f);
  background: #d9d9d9;
`;

const Input = styled.input`
  width: 230px;
  height: 44px;
  border-radius: 50px;
  background: #fff;
  border: none;
  color: var(--gray-scale-464-c-52, #464c52);
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  padding-left: 21px;
  &::-webkit-inner-spin-button,
  &::-webkit-out-spin-button {
    -webkit-appearance: none;

    -moz-appearance: none;

    appearance: none;
  }
`;

const More = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 22px;
  overflow: hidden;
  opacity: ${(props) => (props.isOpen ? "1" : "0")};
  visibility: ${(props) => (props.isOpen ? "visible" : "hidden")};
  max-height: ${({ isOpen }) => (isOpen ? "1000px" : "0")};
  transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s;
`;

const Menu = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 69px;
  border-radius: 0px 0px 20px 20px;
  background: var(--main-scale-b-1-beff, #b1beff);
  font-size: 20px;
  font-weight: 700;
  gap: 8px;
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
