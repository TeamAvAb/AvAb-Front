import React from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import arrow from '../../assets/main/nextSlide.svg';
import starImg from '../../assets/main/starIcon.svg';
import useLoginModalStore from '../../stores/loginModalStore.js';
import useLoginStore from '../../stores/loginStore.js';
import FavBtn from '../button/FavBtn';

export default function RecreationPrev({ content }) {
  const { modalControl } = useLoginModalStore((state) => state);
  const { isLoggedIn } = useLoginStore((state) => state);
  const keywordParam = {
    COOPERATIVE: '협동',
    QUICKNESS: '순발력',
    SENSIBLE: '센스',
    BRAIN: '두뇌',
    CREATIVE: '창의력',
    ACTIVE: '액티브',
    PSYCHOLOGICAL: '심리',
    LUCK: '행운',
    COMMON_SENSE: '상식',
    PREPARATION: '준비물',
  };
  const navigator = useNavigate();
  const gotoDetail = (id) => {
    navigator(`/recreation/detail/${id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Categories>
      <Hashtag>#{content.hashtagList}</Hashtag>
      <RecreationExplain onClick={() => gotoDetail(content.id)}>
        <ImgSpace>
          <ExImg src={content.imageUrl}></ExImg>
          <AbsoluteFavBtn isFav={content.isFavorite} recreationId={content.id} />
        </ImgSpace>
        <Explain>
          <Section1>
            {content.title}
            <img
              src={arrow}
              style={{ width: '1.5rem', height: '1.5rem' }}
              alt={`${content.title} 보러가기`}
            />
          </Section1>
          <Section2>
            <div style={{ display: 'flex', gap: '5px' }}>
              {content.keywordList.map((keyword) => (
                <Keyword key={keyword}>
                  {keywordParam[keyword]}
                  {content.keywordList.indexOf(keyword) === 2 ? null : ','}
                </Keyword>
              ))}
            </div>
            <Rate>
              <img src={starImg} style={{ width: '1rem', height: '1rem' }} alt="별점" />
              {parseFloat(content.totalStars).toFixed(1)}
            </Rate>
          </Section2>
        </Explain>
      </RecreationExplain>
    </Categories>
  );
}

const Categories = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;

const Hashtag = styled.div`
  border-radius: 9999px;
  width: 9rem;
  height: 3.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #5b6bbe;
  color: white;
  font-size: 1.2rem;
  font-weight: 700;
`;

const RecreationExplain = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 18rem;
  height: 20rem;
  margin-top: 1.2rem;
  border-radius: 1.2rem;
  background: ${({ theme }) => theme.color.grayscale07};
  box-shadow: 0 0.6rem 1.2rem 0.2rem ${({ theme }) => theme.color.grayscale01}33;
`;

const ImgSpace = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  flex: 1;
  width: 100%;
`;

const ExImg = styled.img`
  width: 7.5rem;
`;

const Explain = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  justify-content: center;
  align-items: center;
  background-color: #b1beff;
  width: 100%;
  height: 7rem;
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
`;

const Section1 = styled.div`
  color: ${({ theme }) => theme.color.grayscale01};
  text-align: center;
  font-size: 1.2rem;
  font-weight: 700;
  display: flex;
  flex-direction: row;
`;

const Section2 = styled.div`
  width: 80%;
  padding-left: 20px;
  padding-right: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Keyword = styled.div`
  color: ${({ theme }) => theme.color.grayscale02};
  font-size: 16px;
  font-weight: 400;
`;

const Rate = styled.span`
  display: flex;
  flex-direction: row;
  gap: 4px;
  align-items: center;
  color: ${({ theme }) => theme.color.grayscale02};
  font-size: 16px;
  font-weight: 400;
`;

const AbsoluteFavBtn = styled(FavBtn)`
  position: absolute;
  bottom: 0.5rem;
  right: 1rem;
`;
