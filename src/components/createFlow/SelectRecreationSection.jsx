import styled from 'styled-components';
import RecreationCarousel from './RecreationCarousel';
import { useEffect, useState } from 'react';
import { privateAPI } from '../../apis/user';
import searchIconImg from '../../assets/main/searchIcon.svg';

export default function SelectRecreationSection({ purposes, totalPlayTime }) {
  const [recommendedRecreations, setRecommendedRecreations] = useState([]);

  useEffect(() => {
    // API 호출 함수
    const fetchRecreationData = async () => {
      try {
        const response = await privateAPI.get(
          'https://dev.api.avab.site/api/recreations/recommended',
          {
            params: {
              playTime: totalPlayTime,
              purpose: purposes.map((purpose) => purpose.key).join(','),
            },
          },
        );

        // API 응답에서 필요한 데이터만 추출하여 recreationData 상태를 업데이트
        setRecommendedRecreations(
          response.data.result.map((item) => ({
            id: item.id,
            title: item.title,
            totalStars: Math.round(item.totalStars * 10) / 10,
            keywordList: item.keywordList,
            imageUrl: item.imageUrl,
            summary: item.summary,
            isFavorite: item.isFavorite,
          })),
        );
      } catch (error) {
        console.error('Error fetching recreation data:', error);
      }
    };

    // API 호출 함수 호출
    fetchRecreationData();
  }, []);

  return (
    <Container>
      <SectionHeader>레크레이션 선택</SectionHeader>
      <SubSectionHeader>추천 레크레이션</SubSectionHeader>
      <RecreationCarousel recreations={recommendedRecreations} />
      <SubSectionHeader>즐겨 찾는 레크레이션</SubSectionHeader>
      <RecreationCarousel recreations={recommendedRecreations} />
      <SearchBox>
        <SearchInput placeholder="오늘 MT 레크레이션 할 때 뭐하지?" />
        <SearchIcon src={searchIconImg} alt="검색" />
      </SearchBox>
      <RecreationCarousel recreations={recommendedRecreations} />
    </Container>
  );
}

const Container = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  width: 50%;
`;

const SectionHeader = styled.h2`
  ${({ theme }) => theme.text.h4};
  padding: 1.7rem 2.4rem;
  border: 1px solid ${({ theme }) => theme.color.grayscale05};
  border-radius: 1.25rem;
`;

const SubSectionHeader = styled.h3`
  ${({ theme }) => theme.text.h5};
  padding: 1rem 0;
  border-radius: 1.25rem;
  background-color: ${({ theme }) => theme.color.grayscale07};
  text-align: center;
`;

const SearchBox = styled.form`
  width: 100%;
  display: flex;
  position: relative;
`;

const SearchInput = styled.input`
  ${({ theme }) => theme.text.paragraph};
  border-radius: 1.25rem;
  padding: 1.25rem 4rem 1.25rem 2rem;
  border: 2px solid ${({ theme }) => theme.color.main01};
  flex: 1;

  &::placeholder {
    color: ${({ theme }) => theme.color.grayscale04};
  }
`;

const SearchIcon = styled.img`
  position: absolute;
  right: 2rem;
  top: 50%;
  transform: translateY(-50%);
`;
