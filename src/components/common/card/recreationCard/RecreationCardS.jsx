import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import yellowStar from '../../../../assets/recreation/yellowStar.svg';
import FavBtn from '../../button/FavBtn';
import arrowIcon from '../../../../assets/common/nextArrowIcon.svg';
import { scrollToTop } from '../../../../utils/windowUtils';
import { getTranslatedKeywords } from '../../../../utils/keywordUtils';
import useLoginStore from '../../../../stores/loginStore';
import useLoginModalStore from '../../../../stores/loginModalStore';
import { privateAPI } from '../../../../apis/user';
import SITE_URL from '../../../../constants/url';

export default function RecreationCardS({ content, refetch }) {
  const { isLoggedIn } = useLoginStore((state) => state);
  const { modalControl } = useLoginModalStore();
  const [isFav, setIsFav] = useState(content.isFavorite);

  const navigate = useNavigate();
  const navigateToRecreationDetail = (recreationId) => {
    navigate(SITE_URL.RECREATION_DETAIL(recreationId));
    scrollToTop();
  };

  const handleFavClick = async (recreationId) => {
    if (!isLoggedIn) {
      modalControl();
    } else {
      try {
        const response = await privateAPI.post(`/api/recreations/${recreationId}/favorites`);
        if (response.status === 201) {
          setIsFav((prev) => !prev);
          if (refetch) {
            refetch();
          } // 즐겨찾는 레크레이션 페이지 리렌더링 요청
          return;
        } else {
          console.log(response.data);
        }
      } catch (error) {
        throw new Error('FavBtn Error');
      }
    }
  };

  const handleDetailClick = () => {
    navigateToRecreationDetail(content.id);
  };

  const renderKeywords = () => getTranslatedKeywords(content.keywordList).join(', ');

  return (
    <CardLayout>
      <CardContent>
        <img src={content.imageUrl} alt={content.title} />
        <FavBtn isFav={isFav} onClick={() => handleFavClick(content.id)} />
      </CardContent>
      <CardSection onClick={handleDetailClick}>
        <TitleDiv>
          <Title>{content.title}</Title>
          <img src={arrowIcon} alt="" />
        </TitleDiv>
        <KeywordsAndRateBox>
          <Keywords>{renderKeywords()}</Keywords>
          <RateDiv>
            <img src={yellowStar} alt="별" width={16} />
            <Rate>{parseFloat(content.totalStars).toFixed(1)}</Rate>
          </RateDiv>
        </KeywordsAndRateBox>
      </CardSection>
    </CardLayout>
  );
}

const CardSection = styled.button`
  height: 7rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.19rem;
  padding: 0 1.25rem;
  border-radius: 0 0 1.25rem 1.25rem;
  background-color: ${({ theme }) => theme.color.secondary04};
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.color.main03};
  }
`;

const CardLayout = styled.div`
  width: 17.5rem;
  height: 20rem;
  display: flex;
  flex-direction: column;
  border-radius: 1.25rem;
  background-color: ${({ theme }) => theme.color.grayscale07};
  box-shadow: 0 10px 30px 3px ${({ theme }) => theme.color.grayscale01}33;
  flex: 0 0 auto;
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: end;
  flex: 1;
  padding: 2rem 1rem 0;

  img {
    width: 7.5rem;
    margin: 0 auto;
  }
`;

const TitleDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const Title = styled.h5`
  ${({ theme }) => theme.text.h5}
`;

const KeywordsAndRateBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Keywords = styled.div`
  display: flex;
  ${({ theme }) => theme.text.small}
`;

const RateDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;

  img {
    padding: 4px;
    vertical-align: bottom;
  }
`;

const Rate = styled.span`
  ${({ theme }) => theme.text.small}
`;
