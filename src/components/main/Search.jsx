import React, { useEffect, useState } from "react";
import { publicAPI } from "../../apis/user";
import qs from "qs";
import { useNavigate } from "react-router";
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
import useDeboucedEffect from "../../hooks/useDeboucedEffect";

export default function Search() {
  // 검색어 및 키워드 저장
  const [searchKeyword, setSearchKeyword] = useState("");
  const [keyword, setKeyword] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [playTime, setPlayTime] = useState([]);
  const [place, setPlace] = useState([]);
  const [purpose, setPurpose] = useState([]);
  const [gender, setGender] = useState([]);
  const [age, setAge] = useState([]);
  const [participantsAlert, setParticipantsAlert] = useState(false);

  // 검색 옵션
  const keywordOptions = [
    { id: 0, value: "협동", param: "COOPERATIVE" },
    { id: 1, value: "순발력", param: "QUICKNESS" },
    { id: 2, value: "센스", param: "SENSIBLE" },
    { id: 3, value: "두뇌", param: "BRAIN" },
    { id: 4, value: "창의력", param: "CREATIVE" },
    { id: 5, value: "액티브", param: "ACTIVE" },
    { id: 6, value: "심리", param: "PSYCHOLOGICAL" },
    { id: 7, value: "행운", param: "LUCK" },
    { id: 8, value: "상식", param: "COMMON_SENSE" },
    { id: 9, value: "준비물", param: "PREPARATION" },
  ];
  const playTimeOptions = [10, 20, 30, 40, 50, 60];
  const placeOptions = [
    { id: 0, value: "실내", param: "INDOOR" },
    { id: 1, value: "실외", param: "OUTDOOR" },
  ];
  const purposeOptions = [
    { id: 0, value: "워크샵", param: "WORKSHOP" },
    { id: 1, value: "체육대회", param: "SPORTS_DAY" },
    { id: 2, value: "MT", param: "MT" },
    { id: 3, value: "모임", param: "GATHERING" },
    { id: 4, value: "수련회", param: "RETREAT" },
  ];
  const genderOptions = [
    { id: 0, value: "여성", param: "FEMALE" },
    { id: 1, value: "남성", param: "MALE" },
  ];
  const ageOptions = [
    { id: 0, value: "10대 미만", param: "UNDER_TEENAGER" },
    { id: 1, value: "10대", param: "TEENAGER" },
    { id: 2, value: "20대", param: "TWENTIES" },
    { id: 3, value: "30대", param: "THIRTIES" },
    { id: 4, value: "40대", param: "FORTIES" },
    { id: 5, value: "50대 이상", param: "OVER_FIFTIES" },
  ];

  // 필터 더보기 메뉴
  const [menu, setMenu] = useState(false);
  const openMenu = () => {
    setMenu(!menu);
  };
  useEffect(() => {
    if (window.location.pathname === "/search/list") {
      // 검색 리스트 페이지일 때는 열린 상태 유지
      setMenu(true);
    }
  }, []);

  const onRemove = (category, id) => {
    if (category === keywordOptions) {
      setKeyword(
        keyword.filter((el) => {
          return el !== id;
        })
      );
    } else if (category === purposeOptions) {
      setPurpose(
        purpose.filter((el) => {
          return el !== id;
        })
      );
    }
  };

  const checkOnlyNumber = (string) => {
    const check = /[^0-9]/g;
    string = string.replace(check, "");
    return string;
  };
  const participValidCheck = (e) => {
    const value = checkOnlyNumber(e.target.value);
    if (value[0] == 0) {
      setParticipantsAlert(true);
      return;
    }
    if (value < 0 || value > 100) {
      setParticipantsAlert(true);
      return;
    } else {
      if (participantsAlert) setParticipantsAlert(false);
      setParticipants(value);
    }
  };
  // 1~100 이외의 수를 입력할 경우 경고 문구를 디바운싱으로 노출
  useDeboucedEffect(() => setParticipantsAlert(false), 1000, participantsAlert);

  // 모달창
  const [keywordModal, setKeywordModal] = useState(false);
  const [purposeModal, setPurposeModal] = useState(false);

  const renderKeyword = (label, selected) => {
    return selected.map((el) => (
      <>
        <SelectedKeyword key={el}>
          <div>
            '{label[label.findIndex((i) => i.param === el)].value}' 포함
          </div>
          <img
            src={deleteImg}
            id={el}
            style={{ width: "15px", height: "15px" }}
            onClick={(e) => {
              e.stopPropagation();
              onRemove(label, el);
            }}
          />
        </SelectedKeyword>
      </>
    ));
  };

  // 초기화 함수
  const reset = () => {
    setSearchKeyword([]);
    setKeyword([]);
    setParticipants([]);
    setPlayTime([]);
    setPlace([]);
    setPurpose([]);
    setGender([]);
    setAge([]);
  };

  // 필터 적용
  const navigator = useNavigate();
  publicAPI.defaults.paramsSerializer = (params) => {
    return qs.stringify(params, { arrayFormat: "repeat" });
  };
  const submit = async () => {
    const params = {
      searchKeyword: searchKeyword,
      keyword: keyword,
      participants: participants,
      playTime: playTime,
      place: place,
      purpose: purpose,
      gender: gender,
      age: age,
    };

    const param = qs.stringify(params, { arrayFormat: "repeat" });
    try {
      navigator(`/search/list?${param}`, { state: param });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (e) => {
    if (e.key === "Enter") submit();
  };

  useEffect(() => {
    const currentURL = new URLSearchParams(window.location.search);
    if (currentURL.size !== 0) {
      setSearchKeyword(currentURL.get("searchKeyword"));
      setKeyword(currentURL.getAll("keyword"));
      setParticipants(currentURL.get("participants"));
      setPlayTime(currentURL.getAll("playTime"));
      setPlace(currentURL.getAll("place"));
      setPurpose(currentURL.getAll("purpose"));
      setAge(currentURL.getAll("age"));
      setGender(currentURL.getAll("gender"));
    }
  }, [window.location.href]);

  return (
    <SearchEngine>
      {/* 전체 검색어 */}
      <SearchWordBox>
        <SearchWord
          placeholder="오늘 MT 레크레이션 할 때 뭐하지?"
          onChange={(e) => setSearchKeyword(e.target.value)}
          onKeyDown={handleSearch}
          value={searchKeyword}
        />
        <img
          src={searchIconImg}
          style={{ width: "42.399px", height: "42.399px", cursor: "pointer" }}
          onClick={submit}
        />
      </SearchWordBox>
      <SearchBox>
        <Filters $menu={menu.toString()}>
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
            <LabelName htmlFor="participants">인원</LabelName>
            <Input
              placeholder="조별 인원을 입력해주세요."
              type="text"
              onChange={(e) => participValidCheck(e)}
              value={participants}
            ></Input>
            {participantsAlert && (
              <Alert>1부터 100까지만 입력 가능합니다!</Alert>
            )}
          </Filter>

          {/* 진행 시간*/}
          <Filter>
            <LabelName htmlFor="playTime">진행 시간</LabelName>
            <Dropdown
              list={playTimeOptions}
              setOption={setPlayTime}
              selectedOption={playTime}
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
          <More $isopen={menu}>
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
              <LabelName htmlFor="gender">성별</LabelName>
              <RadioInput
                content={genderOptions}
                setOption={setGender}
                selectedOption={gender}
              />
            </Filter>

            {/* 연령대 */}
            <Filter $last="true">
              <LabelName htmlFor="age">연령대</LabelName>
              <RadioInput
                content={ageOptions}
                setOption={setAge}
                selectedOption={age}
              />
            </Filter>
          </More>
        </Filters>
        {window.location.pathname === "/search/list" ? null : (
          <Menu onClick={openMenu}>
            {menu ? (
              <>
                필터 접기
                <img
                  style={{ width: "24px", height: "24px" }}
                  src={arrowUpImg}
                />
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
        )}
      </SearchBox>
      <SearchBtns>
        <Btn id="reset" onClick={reset}>
          초기화
        </Btn>
        <Btn id="search" onClick={submit}>
          필터 적용
        </Btn>
      </SearchBtns>
      {keywordModal ? (
        <KeywordModal
          $category="keyword"
          content={keywordOptions}
          modalControl={setKeywordModal}
          keywordControl={setKeyword}
          selectedOption={keyword}
        />
      ) : null}
      {purposeModal ? (
        <KeywordModal
          $category="purpose"
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
  outline: none;
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
  margin-bottom: ${(props) => (props.$last ? "26px" : 0)};
  color: #fff;
  font-size: 20px;
  font-weight: 700;
  cursor: pointer;
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
  overflow-x: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  cursor: pointer;
`;

const SelectedKeywords = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const SelectedKeyword = styled.div`
  width: max-content;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 2px 10px;
  gap: 12px;
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
  opacity: ${({ $isopen }) => ($isopen ? "1" : "0")};
  visibility: ${({ $isopen }) => ($isopen ? "visible" : "hidden")};
  max-height: ${({ $isopen }) => ($isopen ? "1000px" : "0")};
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
  cursor: pointer;
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
const Btn = styled.button`
  display: flex;
  padding: 9px 24px;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  border: 1px solid var(--gray-scale-1-b-1-d-1-f, #1b1d1f);

  font-size: 20px;
  font-weight: 700;
  cursor: pointer;

  &#reset {
    background: var(--gray-scale-f-7-f-8-f-9, #f7f8f9);
    color: var(--gray-scale-1-b-1-d-1-f, #1b1d1f);
  }

  &#search {
    background: var(--gray-scale-1-b-1-d-1-f, #1b1d1f);
    color: #fff;
  }
`;

const Alert = styled.span`
  padding-top: 2px;
  margin-left: 14px;
  font-size: 14px;
  font-weight: 400;
  color: #fff;
`;
