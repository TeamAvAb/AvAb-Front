import React, { useState } from 'react';
import { publicAPI } from '../../apis/user';
import qs from 'qs';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

import KeywordModal from './KeywordModal';
import PlayTimeSelect from './PlayTimeSelect';
import RadioInput from './RadioInput';

import searchIconImg from '../../assets/main/searchIcon.svg';
import keywordImg from '../../assets/main/checkIcon.svg';
import hrImg from '../../assets/main/hr.svg';
import deleteIcon from '../../assets/common/deleteIcon.svg';
import arrowDownImg from '../../assets/main/arrowDownIcon.svg';
import arrowUpImg from '../../assets/main/arrowUpIcon.svg';
import useDebouncedEffect from '../../hooks/useDebouncedEffect';
import Button from '../common/button/Button';
import KEYWORD_CATEGORY from '../../constants/searchKeywordCategory';
import KEYWORD from '../../constants/enum/keyword';
import PURPOSE from '../../constants/enum/purpose';
import GENDER from '../../constants/enum/gender';
import AGE from '../../constants/enum/age';
import PLACE from '../../constants/enum/place';
import { scrollToTop } from '../../utils/windowUtils';
import AlertMessage from '../common/AlertMessage';
import SITE_URL from '../../constants/url';

export default function Search({ filtersOpen = false, initialParams = {} }) {
  const getInitialKeywords = (keywords) => {
    if (!keywords) {
      return [];
    }

    if (Array.isArray(keywords)) {
      return keywords.map((keyword) => KEYWORD[keyword]).filter((v) => v);
    }

    return [KEYWORD[keywords]].filter((v) => v);
  };

  const getInitialPurpose = (purposes) => {
    if (!purposes) {
      return [];
    }

    if (Array.isArray(purposes)) {
      return purposes.map((purpose) => PURPOSE[purpose]).filter((v) => v);
    }

    return [PURPOSE[purposes]].filter((v) => v);
  };

  const getInitialPlaces = (places) => {
    if (!places) {
      return [];
    }

    if (Array.isArray(places)) {
      return places.map((place) => PLACE[place]).filter((v) => v);
    }

    return [PLACE[places]].filter((v) => v);
  };

  const getInitialGenders = (genders) => {
    if (!genders) {
      return [];
    }

    if (Array.isArray(genders)) {
      return genders.map((gender) => GENDER[gender]).filter((v) => v);
    }

    return [GENDER[genders]].filter((v) => v);
  };

  const getInitialAges = (ages) => {
    if (!ages) {
      return [];
    }

    if (Array.isArray(ages)) {
      return ages.map((age) => AGE[age]).filter((v) => v);
    }

    return [AGE[ages]].filter((v) => v);
  };

  const params = {
    searchKeyword: initialParams.searchKeyword ?? '',
    keyword: getInitialKeywords(initialParams.keyword),
    participants: initialParams.participants ?? '',
    playTime: initialParams.playTime ?? null,
    place: getInitialPlaces(initialParams.place),
    purpose: getInitialPurpose(initialParams.purpose),
    gender: getInitialGenders(initialParams.gender),
    age: getInitialAges(initialParams.age),
  };

  // 검색어 및 키워드 저장
  const [searchKeyword, setSearchKeyword] = useState(params.searchKeyword);
  const [keyword, setKeyword] = useState(params.keyword);
  const [participants, setParticipants] = useState(params.participants);
  const [playTime, setPlayTime] = useState(params.playTime);
  const [place, setPlace] = useState(params.place);
  const [purpose, setPurpose] = useState(params.purpose);
  const [gender, setGender] = useState(params.gender);
  const [age, setAge] = useState(params.age);
  const [participantsAlert, setParticipantsAlert] = useState(false);

  const participantsLimit = 20;
  const playTimeOptions = [10, 20, 30, 40, 50, 60];

  // 필터 더보기 메뉴
  const [isMenuOpen, setIsMenuOpen] = useState(filtersOpen);
  const openMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleRemoveClick = (category, targetValue) => {
    if (category === KEYWORD_CATEGORY.KEYWORD) {
      setKeyword(keyword.filter((el) => el.key !== targetValue.key));
    } else {
      setPurpose(purpose.filter((el) => el.key !== targetValue.key));
    }
  };

  const checkOnlyNumber = (string) => {
    const check = /[^0-9]/g;
    string = string.replace(check, '');
    return string;
  };

  const validateParticipants = (v) => {
    const value = checkOnlyNumber(v);
    if (value[0] === 0) {
      setParticipantsAlert(true);
      return;
    }
    if (value < 0 || value > participantsLimit) {
      setParticipantsAlert(true);
      return;
    }

    if (participantsAlert) {
      setParticipantsAlert(false);
    }

    setParticipants(value);
  };

  // 1~participantsLimit 이외의 수를 입력할 경우 경고 문구를 디바운싱으로 노출
  useDebouncedEffect(() => setParticipantsAlert(false), 1000, [participantsAlert]);

  // 모달창
  const [keywordModal, setKeywordModal] = useState(false);
  const [purposeModal, setPurposeModal] = useState(false);

  const renderKeyword = (category, selected) => {
    return selected.map((el) => (
      <SelectedKeyword key={el.key}>
        <span>{el.value} 포함</span>
        <img
          alt={`${el.value} 삭제`}
          src={deleteIcon}
          id={el}
          style={{ width: '1rem' }}
          onClick={(e) => {
            e.stopPropagation();
            handleRemoveClick(category, el);
          }}
        />
      </SelectedKeyword>
    ));
  };

  // 초기화 함수
  const reset = () => {
    setSearchKeyword('');
    setKeyword([]);
    setParticipants('');
    setPlayTime(null);
    setPlace([]);
    setPurpose([]);
    setGender([]);
    setAge([]);
  };

  // 필터 적용
  const navigate = useNavigate();
  publicAPI.defaults.paramsSerializer = (params) => {
    return qs.stringify(params, { arrayFormat: 'repeat' });
  };
  const submit = async () => {
    const params = {
      searchKeyword: searchKeyword,
      keyword: keyword.map((el) => el.key),
      participants: participants,
      playTime: playTime,
      place: place.map((el) => el.key),
      purpose: purpose.map((el) => el.key),
      gender: gender.map((el) => el.key),
      age: age.map((el) => el.key),
    };

    console.log(params);

    const param = qs.stringify(params, { arrayFormat: 'repeat' });

    navigate(`${SITE_URL.RECREATION_SEARCH_LIST}?${param}`);
    scrollToTop();
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      submit();
    }
  };

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
          alt="검색 돋보기"
          src={searchIconImg}
          style={{ width: '3rem', marginRight: '1.2rem', cursor: 'pointer' }}
          onClick={submit}
        />
      </SearchWordBox>
      <SearchBox $filtersOpen={filtersOpen}>
        <Filters $menu={isMenuOpen.toString()}>
          {/* 키워드 */}
          <Filter>
            <LabelName htmlFor="keyword">키워드</LabelName>
            <KeywordBox id="keyword" onClick={() => setKeywordModal(true)}>
              <img src={keywordImg} style={{ width: '20px', height: '20px' }} alt="" />
              {keyword.length === 0 ? (
                '클릭하면 키워드 선택창이 나와요!'
              ) : (
                <SelectedKeywords>
                  {renderKeyword(KEYWORD_CATEGORY.KEYWORD, keyword)}
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
              onChange={(e) => validateParticipants(e.target.value)}
              value={participants}
              $error={participantsAlert}
            />
            {participantsAlert && (
              <AlertMessage message={`1부터 ${participantsLimit}까지 입력해주세요.`} />
            )}
          </Filter>

          {/* 진행 시간*/}
          <Filter>
            <LabelName htmlFor="playTime">진행 시간</LabelName>
            <PlayTimeSelect
              options={playTimeOptions}
              setOption={setPlayTime}
              selectedOption={playTime}
            />
          </Filter>

          {/* 장소 */}
          <Filter>
            <LabelName htmlFor="place">장소</LabelName>
            <RadioInput
              options={Object.values(PLACE)}
              setOption={setPlace}
              selectedOption={place}
            />
          </Filter>
        </Filters>
        <MoreFilters $open={isMenuOpen}>
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <img src={hrImg} style={{ width: '25%' }} alt="" />
          </div>

          {/* 목적 */}
          <Filter>
            <LabelName htmlFor="purpose">목적</LabelName>
            <KeywordBox id="purpose" onClick={() => setPurposeModal(true)}>
              <img src={keywordImg} style={{ width: '1.2rem' }} alt="" />
              {purpose.length === 0 ? (
                '클릭하면 목적 선택창이 나와요!'
              ) : (
                <SelectedKeywords>
                  {renderKeyword(KEYWORD_CATEGORY.PURPOSE, purpose)}
                </SelectedKeywords>
              )}
            </KeywordBox>
          </Filter>

          {/* 성별 */}
          <Filter>
            <LabelName htmlFor="gender">성별</LabelName>
            <RadioInput
              options={Object.values(GENDER)}
              setOption={setGender}
              selectedOption={gender}
            />
          </Filter>

          {/* 연령대 */}
          <Filter>
            <LabelName htmlFor="age">연령대</LabelName>
            <RadioInput options={Object.values(AGE)} setOption={setAge} selectedOption={age} />
          </Filter>
          <div style={{ height: '1rem' }} />
        </MoreFilters>
      </SearchBox>

      {filtersOpen ? null : (
        <MoreFiltersButton onClick={openMenu}>
          {isMenuOpen ? (
            <>
              필터 접기
              <img alt="필터 접기" style={{ width: '24px', height: '24px' }} src={arrowUpImg} />
            </>
          ) : (
            <>
              필터 더보기
              <img alt="필터 더보기" style={{ width: '24px', height: '24px' }} src={arrowDownImg} />
            </>
          )}
        </MoreFiltersButton>
      )}
      <BtnContainer>
        <SearchButtons>
          <Button onClick={reset} border backgroundColor="grayscale07" size="sm">
            초기화
          </Button>
          <Button onClick={submit} border backgroundColor="grayscale01" color="main05" size="sm">
            필터 적용
          </Button>
        </SearchButtons>
      </BtnContainer>

      {keywordModal ? (
        <KeywordModal
          category={KEYWORD_CATEGORY.KEYWORD}
          content={Object.values(KEYWORD)}
          modalControl={setKeywordModal}
          keywordControl={setKeyword}
          selectedOption={keyword}
        />
      ) : null}
      {purposeModal ? (
        <KeywordModal
          category={KEYWORD_CATEGORY.PURPOSE}
          content={Object.values(PURPOSE)}
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
  overflow: hidden;
  align-items: center;
  width: 32rem;
  box-shadow: 0 0 1.2rem 0 ${({ theme }) => `${theme.color.grayscale01}26`};
  border-radius: 9999px;
  background: ${({ theme }) => theme.color.main05};
  margin-bottom: 2rem;
`;

const SearchWord = styled.input`
  width: 100%;
  box-sizing: content-box;
  height: 3rem;
  padding: 0.5rem 0 0.5rem 2rem;
  display: block;
  align-items: center;
  gap: 3rem;
  background: ${({ theme }) => theme.color.main05};
  color: ${({ theme }) => theme.color.grayscale03};
  transition: max-height 0.3s ease-in-out;
  border: 0;
  outline: none;
  ${({ theme }) => theme.text.paragraph};
`;

// 필터링 박스
const SearchBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: 1.2rem 1.2rem ${({ $filtersOpen }) => ($filtersOpen ? '1.2rem 1.2rem' : '0 0')};
  background: ${({ theme }) => theme.color.main01};
  width: 62rem;
`;

// 필터 설정 박스
const Filters = styled.div`
  padding: 1.5rem 3rem 1.5rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
`;

const Filter = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  color: ${({ theme }) => theme.color.grayscale04};
  cursor: pointer;
  ${({ theme }) => theme.text.small};
`;

const LabelName = styled.label`
  text-align: start;
  width: 7.5rem;
  ${({ theme }) => theme.text.h5};
  color: ${({ theme }) => theme.color.main05};
`;

const KeywordBox = styled.div`
  flex: 1;
  height: 3rem;
  border-radius: 9999px;
  padding-right: 1rem;
  background: ${({ theme }) => theme.color.main05};
  color: ${({ theme }) => theme.color.grayscale04};
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  align-items: center;
  padding-left: 1.4rem;

  cursor: pointer;

  width: 100%;
  overflow: hidden;
`;

const SelectedKeywords = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.8rem;
  overflow-x: auto;
  white-space: nowrap;
  width: 100%;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const SelectedKeyword = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.2rem 0.8rem;
  gap: 0.8rem;
  border-radius: 9999px;
  background: #d9d9d9; // 디자인 시스템에 없는 색상
  color: ${({ theme }) => theme.color.grayscale01};
`;

const Input = styled.input`
  width: 16rem;
  height: 3rem;
  border-radius: 9999px;
  outline: ${({ $error, theme }) => ($error ? `3px solid ${theme.color.main04}` : 'none')};
  background: ${({ theme }) => theme.color.main05};
  border: none;
  color: ${({ theme }) => theme.color.grayscale03};
  ${({ theme }) => theme.text.small};
  padding-left: 1.5rem;

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;

    -moz-appearance: none;

    appearance: none;
  }

  &::placeholder {
    color: ${({ theme }) => theme.color.grayscale04};
  }
`;

const MoreFilters = styled.div`
  padding: 0 3rem 0 1.5rem;
  display: inline-flex;
  flex-direction: column;
  gap: 1.5rem;
  overflow: hidden;
  max-height: ${({ $open }) => ($open ? '1000px' : '0')};
  transition: max-height 0.7s ease-in-out;
`;

const MoreFiltersButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  border-radius: 0 0 1.2rem 1.2rem;
  padding: 1.8rem 0;
  background: ${({ theme }) => theme.color.secondary04};
  ${({ theme }) => theme.text.h5};
  gap: 0.5rem;
  cursor: pointer;
  box-shadow: ${({ theme }) => `0 1rem 1.2rem 0 ${theme.color.grayscale01}14`};
`;

// 버튼
const BtnContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: end;
  margin-top: 2rem;
  margin-bottom: 2rem;
`;

const SearchButtons = styled.div`
  display: flex;
  gap: 2.5rem;
`;
