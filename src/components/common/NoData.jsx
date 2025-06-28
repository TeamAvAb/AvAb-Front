import cryingAvb from '../../assets/character/cryingAvb.png';
import styled from 'styled-components';

export default function NoData({ variant }) {
  const TEXT = {
    NO_SEARCH_DATA: {
      title: '검색 결과가 없습니다!',
      description: '다른 조건으로 검색해보세요.',
    },
    NO_SCRAP_FLOW: {
      title: '스크랩한 플로우가 없습니다!',
      description: '지금 바로 플로우를 구경해보세요.',
    },
    NO_MY_FLOW: {
      title: '내가 만든 일정플로우가 없습니다!',
      description: '상단의 버튼을 눌러 나만의 일정플로우를 만들어보세요.',
    },
    LOAD_FLOW_ERROR: {
      title: '플로우 조회에 실패했습니다.',
      description: '잠시후 다시 시도해주세요.',
    },
    NO_FAVORITE_RECREATION: {
      title: '즐겨 찾는 레크레이션이 없습니다!',
      description: '지금 바로 레크레이션을 구경해보세요.',
    },
    CREATE_FLOW_NO_RECOMMENDED_FLOW: {
      title: '추천 플로우가 없습니다!',
      description: '정보를 더 자세히 입력해보세요.',
    },
    NO_RELATED_FLOW: {
      title: '연관된 플로우가 없습니다!',
      description: '해당 레크레이션을 포함한 일정플로우를 만들어보세요.',
    },
  };

  let text = null;
  switch (variant) {
    case 'search':
      text = TEXT.NO_SEARCH_DATA;
      break;
    case 'scrapFlow':
      text = TEXT.NO_SCRAP_FLOW;
      break;
    case 'myFlow':
      text = TEXT.NO_MY_FLOW;
      break;
    case 'flowError':
      text = TEXT.LOAD_FLOW_ERROR;
      break;
    case 'favoriteRecreation':
      text = TEXT.NO_FAVORITE_RECREATION;
      break;
    case 'cfRecommendedFlows':
      text = TEXT.CREATE_FLOW_NO_RECOMMENDED_FLOW;
      break;
    case 'relatedFlow':
      text = TEXT.NO_RELATED_FLOW;
      break;
    default:
      break;
  }

  return (
    <Container>
      <NoDataImg src={cryingAvb} />
      <TextContainer>
        <h2>{text.title}</h2>
        <p>{text.description}</p>
      </TextContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  height: 100%;
`;

const NoDataImg = styled.img`
  width: 12rem;
`;

const TextContainer = styled.div`
  width: 100%;
  text-align: center;
  display: flex;
  gap: 0.5rem;
  flex-direction: column;

  h2 {
    ${({ theme }) => theme.text.h4}
    line-height: normal;
  }

  p {
    ${({ theme }) => theme.text.paragraph}
    line-height: normal;
  }
`;
