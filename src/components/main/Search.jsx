import React, { useEffect, useState } from 'react';
import { publicAPI } from '../../apis/user';
import qs from 'qs';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

import KeywordModal from './KeywordModal';
import Dropdown from './Dropdown';
import RadioInput from './RadioInput';

import searchIconImg from '../../assets/main/searchIcon.svg';
import keywordImg from '../../assets/main/checkIcon.svg';
import hrImg from '../../assets/main/hr.svg';
import deleteImg from '../../assets/main/deleteIcon.svg';
import arrowDownImg from '../../assets/main/arrowDownIcon.svg';
import arrowUpImg from '../../assets/main/arrowUpIcon.svg';
import alertImg from '../../assets/main/alert.svg';
import useDebouncedEffect from '../../hooks/useDebouncedEffect';
import Button from '../button/Button';

export default function Search({ filtersOpen = false }) {
  // 검색어 및 키워드 저장
  const [searchKeyword, setSearchKeyword] = useState('');
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
    { id: 0, value: '협동', param: 'COOPERATIVE' },
    { id: 1, value: '순발력', param: 'QUICKNESS' },
    { id: 2, value: '센스', param: 'SENSIBLE' },
    { id: 3, value: '두뇌', param: 'BRAIN' },
    { id: 4, value: '창의력', param: 'CREATIVE' },
    { id: 5, value: '액티브', param: 'ACTIVE' },
    { id: 6, value: '심리', param: 'PSYCHOLOGICAL' },
    { id: 7, value: '행운', param: 'LUCK' },
    { id: 8, value: '상식', param: 'COMMON_SENSE' },
    { id: 9, value: '준비물', param: 'PREPARATION' },
  ];
  const participantsLimit = 20;
  const playTimeOptions = [10, 20, 30, 40, 50, 60];
  const placeOptions = [
    { id: 0, value: '실내', param: 'INDOOR' },
    { id: 1, value: '실외', param: 'OUTDOOR' },
  ];
  const purposeOptions = [
    { id: 0, value: '워크샵', param: 'WORKSHOP' },
    { id: 1, value: '체육대회', param: 'SPORTS_DAY' },
    { id: 2, value: 'MT', param: 'MT' },
    { id: 3, value: '모임', param: 'GATHERING' },
    { id: 4, value: '수련회', param: 'RETREAT' },
  ];
  const genderOptions = [
    { id: 0, value: '여성', param: 'FEMALE' },
    { id: 1, value: '남성', param: 'MALE' },
  ];
  const ageOptions = [
    { id: 0, value: '10대 미만', param: 'UNDER_TEENAGER' },
    { id: 1, value: '10대', param: 'TEENAGER' },
    { id: 2, value: '20대', param: 'TWENTIES' },
    { id: 3, value: '30대', param: 'THIRTIES' },
    { id: 4, value: '40대', param: 'FORTIES' },
    { id: 5, value: '50대 이상', param: 'OVER_FIFTIES' },
  ];

  // 필터 더보기 메뉴
  const [isMenuOpen, setIsMenuOpen] = useState(filtersOpen);
  const openMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const onRemove = (category, id) => {
    if (category === keywordOptions) {
      setKeyword(
        keyword.filter((el) => {
          return el !== id;
        }),
      );
    } else if (category === purposeOptions) {
      setPurpose(
        purpose.filter((el) => {
          return el !== id;
        }),
      );
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
  useDebouncedEffect(() => setParticipantsAlert(false), 1000, participantsAlert);

  // 모달창
  const [keywordModal, setKeywordModal] = useState(false);
  const [purposeModal, setPurposeModal] = useState(false);

  const renderKeyword = (label, selected) => {
    return selected.map((el) => (
      <SelectedKeyword key={el}>
        <span>'{label[label.findIndex((i) => i.param === el)].value}' 포함</span>
        <img
          alt={`${el.value} 삭제`}
          src={deleteImg}
          id={el}
          style={{ width: '1rem' }}
          onClick={(e) => {
            e.stopPropagation();
            onRemove(label, el);
          }}
        />
      </SelectedKeyword>
    ));
  };

  // 초기화 함수
  const reset = () => {
    setSearchKeyword('');
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
    return qs.stringify(params, { arrayFormat: 'repeat' });
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

    const param = qs.stringify(params, { arrayFormat: 'repeat' });
    try {
      navigator(`/search/list?${param}`, { state: param });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      submit();
    }
  };

  useEffect(() => {
    const currentURL = new URLSearchParams(window.location.search);
    if (currentURL.size !== 0) {
      setSearchKeyword(currentURL.get('searchKeyword'));
      setKeyword(currentURL.getAll('keyword'));
      setParticipants(currentURL.get('participants'));
      setPlayTime(currentURL.getAll('playTime'));
      setPlace(currentURL.getAll('place'));
      setPurpose(currentURL.getAll('purpose'));
      setAge(currentURL.getAll('age'));
      setGender(currentURL.getAll('gender'));
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
          alt="검색 돋보기"
          src={searchIconImg}
          style={{ width: '3rem', marginRight: '1.2rem', cursor: 'pointer' }}
          onClick={submit}
        />
      </SearchWordBox>
      <SearchBox filtersOpen={filtersOpen}>
        <Filters $menu={isMenuOpen.toString()}>
          {/* 키워드 */}
          <Filter>
            <LabelName htmlFor="keyword">키워드</LabelName>
            <KeywordBox id="keyword" onClick={() => setKeywordModal(true)}>
              <img src={keywordImg} style={{ width: '20px', height: '20px' }} alt="" />
              {keyword.length === 0 ? (
                '클릭하면 키워드 선택창이 나와요!'
              ) : (
                <SelectedKeywords>{renderKeyword(keywordOptions, keyword)}</SelectedKeywords>
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
              error={participantsAlert}
            />
            {participantsAlert && (
              <Alert>
                <img src={alertImg} alt="경고" />
                <span>1부터 {participantsLimit}까지 입력해주세요.</span>
              </Alert>
            )}
          </Filter>

          {/* 진행 시간*/}
          <Filter>
            <LabelName htmlFor="playTime">진행 시간</LabelName>
            <Dropdown list={playTimeOptions} setOption={setPlayTime} selectedOption={playTime} />
          </Filter>

          {/* 장소 */}
          <Filter>
            <LabelName htmlFor="place">장소</LabelName>
            <RadioInput content={placeOptions} setOption={setPlace} selectedOption={place} />
          </Filter>
        </Filters>
        <MoreFilters open={isMenuOpen}>
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
                <SelectedKeywords>{renderKeyword(purposeOptions, purpose)}</SelectedKeywords>
              )}
            </KeywordBox>
          </Filter>

          {/* 성별 */}
          <Filter>
            <LabelName htmlFor="gender">성별</LabelName>
            <RadioInput content={genderOptions} setOption={setGender} selectedOption={gender} />
          </Filter>

          {/* 연령대 */}
          <Filter>
            <LabelName htmlFor="age">연령대</LabelName>
            <RadioInput content={ageOptions} setOption={setAge} selectedOption={age} />
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
          category="keyword"
          content={keywordOptions}
          modalControl={setKeywordModal}
          keywordControl={setKeyword}
          selectedOption={keyword}
        />
      ) : null}
      {purposeModal ? (
        <KeywordModal
          category="purpose"
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
  border-radius: 1.2rem 1.2rem ${({ filtersOpen }) => (filtersOpen ? '1.2rem 1.2rem' : '0 0')};
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
  color: ${({ theme }) => theme.color.main05};
  cursor: pointer;
  ${({ theme }) => theme.text.h5};
`;

const LabelName = styled.label`
  text-align: start;
  width: 7.5rem;
`;

const KeywordBox = styled.div`
  flex: 1;
  height: 3rem;
  border-radius: 9999px;
  padding-right: 0.5rem;
  background: ${({ theme }) => theme.color.main05};
  color: ${({ theme }) => theme.color.grayscale04};
  ${({ theme }) => theme.text.small};
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  align-items: center;
  padding-left: 1.4rem;

  &::-webkit-scrollbar {
    display: none;
  }

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
  outline: ${({ error, theme }) => (error ? `3px solid ${theme.color.main04}` : 'none')};
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
`;

const MoreFilters = styled.div`
  padding: 0 3rem 0 1.5rem;
  display: inline-flex;
  flex-direction: column;
  gap: 1.5rem;
  overflow: hidden;
  max-height: ${({ open }) => (open ? '1000px' : '0')};
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

const Alert = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: baseline;
  margin-left: 1rem;
  color: ${({ theme }) => theme.color.main04};
  ${({ theme }) => theme.text.small};
`;
